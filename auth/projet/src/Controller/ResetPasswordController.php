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
class ResetPasswordController extends AbstractController
{

    private $doctrine;
    private $userRepository;

    public function __construct(DocumentManager $doctrine, UserRepository $userRepository)
    {
        $this->doctrine = $doctrine;
        $this->userRepository = $userRepository;
    }

    #[Route('/reset/password', name: 'reset_password', methods: ['PUT'])]
    public function index(
        Request $request,
        UserPasswordHasherInterface $passwordHasher,
        MailerInterface $mailer,
        JWTTokenManagerInterface $JWTManager
    ): Response {

        // Etape 1 : Récupération des données depuis le JSON 
        $decoded = json_decode($request->getContent());
        $email = $decoded->email;

        // Etape 2 : Vérification de l'existence du mail en BDD
        $user = $this->userRepository->findOneBy(array('email' => $email));
        if (is_null($user)) {
            $response = new JsonResponse(['message' => 'Cet email n\'existe pas.']);
            $response->setStatusCode(422, 'Cet email n\'existe pas.');

            return $response;
        }

        $newPassword = bin2hex(random_bytes(5));
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $newPassword
        );
        $user->setPassword($hashedPassword);
        $user->setResetPassword(true);
        $this->doctrine->persist($user);
        $this->doctrine->flush();

        // Etape 5 (optionnel si random password) : Envoi des identifiants de l'utilisateurs
        $email = (new TemplatedEmail())
            ->from('forget@dss.com')
            ->to(new Address($email))
            ->subject('Votre compte Dev Salary Simulator')

            // path of the Twig template to render
            ->htmlTemplate('emails/reset_password.html.twig')

            // pass variables (name => value) to the template
            ->context([
                'user' => $user,
                'plainPassword' => $newPassword,
            ]);
        $mailer->send($email);
        // Etape 6 : Message d'enregistrement effectué


        $response = new JsonResponse([
            'message' => 'Un nouveau mot de passe vous a été envoyer sur votre boîte mail.']);
        $response->setStatusCode(200, 'Un nouveau mot de passe vous a été envoyer sur votre boîte mail.');

        return $response;
    }
}