<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Http\Attribute\IsGranted;

use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;
use App\Repository\UserRepository;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


#[Route('/api/user', name: "api_")]
class DashboardController extends AbstractController
{

    private $doctrine;
    private $userRepository;
    private $encoders;
    private $normalizers;
    private $serializer;
    private $passwordHasher;

    public function __construct(DocumentManager $doctrine, UserRepository $userRepository, UserPasswordHasherInterface $passwordHasher)
    {
        $this->doctrine = $doctrine;
        $this->userRepository = $userRepository;
        $this->passwordHasher = $passwordHasher;

        $this->encoders = [new XmlEncoder(), new JsonEncoder()];
        $this->normalizers = [new ObjectNormalizer()];
        $this->serializer = new Serializer($this->normalizers, $this->encoders);
    }

    #[Route('/profile', name: 'profile', methods: ['GET'])]
    #[IsGranted('ROLE_USER', statusCode: 401, message: 'Vous devez vous connecter pour accéder à cette page.')]
    public function index(): Response
    {

        $data = $this->serializer->normalize($this->getUser(), null, [
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['password', 'salt', 'username', 'userIdentifier'],
            AbstractNormalizer::CALLBACKS => [
                'birthday' => function ($date) {
                    return $date instanceof \DateTime ? $date->format('Y-m-d') : '';
                }
            ]
        ]);

        $response =  new JsonResponse([
            // 'user'=> $data
            $data
        ]);

        $response->setStatusCode(200);

        return $response;
    }

    #[Route('/', name: 'update_profile', methods: ['PUT', 'PATCH'])]
    #[IsGranted('ROLE_USER', statusCode: 401, message: 'Vous devez vous connecter pour accéder à cette page.')]
    public function updateUserProfile(Request $request): Response
    {
        // Récupération des potentiels données
        $decoded = json_decode($request->getContent());
        $firstName = $decoded->firstname;
        $lastName = $decoded->lastname;
        $birthday = $decoded->birthday;

        $plainTextPassword = isset($decoded->password) ? $decoded->password : null;

        $user = $this->getUser();
        $user->setFirstName($firstName);
        $user->setLastName($lastName);
        $user->setBirthday(new \DateTime($birthday));
        // On vérifie si l'utilisateur a renseigné un nouveau mot de passe
        if(isset($plainTextPassword) && !is_null($plainTextPassword)){
            if (
                strlen($plainTextPassword) < 14 || !preg_match('/[A-Z]/', $plainTextPassword) || !preg_match('/[a-z]/', $plainTextPassword)
                || !preg_match('/[0-9]/', $plainTextPassword) || !preg_match('/[^A-Za-z0-9]/', $plainTextPassword)
            ) {
    
                $response = new JsonResponse(['message' => 'Le mot de passe doit avoir au moins 14 caractères (au moins 1 lettre majuscule, au moins 1 chiffres, au moins 1 lettre minuscule et au moins1 caractère spécial.']);
                $response->setStatusCode(400, 'Le mot de passe doit avoir au moins 14 caractères (au moins 1 lettre majuscule, au moins 1 chiffres, au moins 1 lettre minuscule et au moins1 caractère spécial.');
    
                return $response;
            }

            $hashedPassword = $this->passwordHasher->hashPassword(
                $user,
                $plainTextPassword
            );
            $user->setPassword($hashedPassword);
            $user->setResetPassword(false);
        }
        
        $this->doctrine->persist($user);
        $this->doctrine->flush();

        $data = $this->serializer->normalize($user, null, [
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['password', 'salt', 'username', 'userIdentifier'],
            AbstractNormalizer::CALLBACKS => [
                'birthday' => function ($date) {
                    return $date instanceof \DateTime ? $date->format('Y-m-d') : '';
                }
            ]
        ]);
        $response = new JsonResponse([
            $data
        ]);
        $response->setStatusCode(200, 'Votre profil a été mis à jour avec succès.');

        return $response;
    }
}
