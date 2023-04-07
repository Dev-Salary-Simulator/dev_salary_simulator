<?php

namespace App\Controller;

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Persistence\ManagerRegistry;
use App\Document\User;
use App\Repository\UserRepository;
use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;

// Import SymfonyMailer
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mime\Address;

// JWT Bundle
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;




#[Route('/api/auth', name: "api_")]
class RegistrationController extends AbstractController
{

    private $doctrine;
    private $userRepository;

    public function __construct(DocumentManager $doctrine, UserRepository $userRepository)
    {
        $this->doctrine = $doctrine;
        $this->userRepository = $userRepository;
    }

    #[Route('/register', name: 'register', methods: ['POST'])]
    public function index(
        Request $request,
        UserPasswordHasherInterface $passwordHasher,
        MailerInterface $mailer,
        JWTTokenManagerInterface $JWTManager
    ): Response {

        // Etape 1 : Récupération des données depuis le JSON 
        $decoded = json_decode($request->getContent());
        $email = $decoded->email;
        // $firstname = $decoded->firstname;
        // $lastname = $decoded->lastname;
        // $birthday = $decoded->birthday;
        $plaintextPassword = $decoded->password;

        // Etape 2 : Vérification de l'existence du mail en BDD
        $userExist = $this->userRepository->findExistingEmail($email);
        if (count($userExist) > 0) {
            $response = new JsonResponse(['message' => 'Cet email est déjà enregistré.']);
            $response->setStatusCode(422, 'Cet email est déjà enregistré.');

            return $response;
        }

        // Etape 3 : Vérification de la sécurité du mot de passe 

        // Vérifie si le mot de passe contient au moins 14 caractères et 
        // au moins une majuscule, des minuscules, un chiffre et des caractères spéciaux
        if (
            strlen($plaintextPassword) < 14 || !preg_match('/[A-Z]/', $plaintextPassword) || !preg_match('/[a-z]/', $plaintextPassword)
            || !preg_match('/[0-9]/', $plaintextPassword) || !preg_match('/[^A-Za-z0-9]/', $plaintextPassword)
        ) {

            $response = new JsonResponse(['message' => 'Le mot de passe doit avoir au moins 14 caractères (au moins 1 lettre majuscule, au moins 1 chiffres, au moins 1 lettre minuscule et au moins1 caractère spécial.']);
            $response->setStatusCode(400, 'Le mot de passe doit avoir au moins 14 caractères (au moins 1 lettre majuscule, au moins 1 chiffres, au moins 1 lettre minuscule et au moins1 caractère spécial.');

            return $response;
        }
        // Etape 4 : Enregistrement de l'utilisateur
        $user = new User();
        $user->setEmail($email);
        // $user->setFirstName($firstname);
        // $user->setLastName($lastname);
        // $user->setBirthday(new \DateTime($birthday));
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $plaintextPassword
        );
        $user->setPassword($hashedPassword);
        $user->setRoles([]);
        $this->doctrine->persist($user);
        $this->doctrine->flush();

        // Etape 5 (optionnel si random password) : Envoi des identifiants de l'utilisateurs
        $email = (new TemplatedEmail())
            ->from(new Address($this->getParameter('mail_sender')))
            ->to(new Address($email))
            ->subject('Votre compte Dev Salary Simulator')

            // path of the Twig template to render
            ->htmlTemplate('emails/register.html.twig')

            // pass variables (name => value) to the template
            ->context([
                'user' => $user
            ]);
        $mailer->send($email);
        // Etape 6 : Message d'enregistrement effectué


        $response = new JsonResponse([
            'message' => 'Votre compte a bien été enregistré', 
            'user' => $user,
            'jwt'=> $JWTManager->create($user)
        ]);
        $response->setStatusCode(200, 'Votre compte a bien été enregistré');

        return $response;
    }
}
