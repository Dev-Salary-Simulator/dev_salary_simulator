<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\HttpFoundation\Request;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;


#[Route('/api/auth', name: "api_")]
class AutoLoginController extends AbstractController
{

    private $jwtManager;
    private $tokenStorageInterface;

    public function __construct(TokenStorageInterface $tokenStorageInterface, JWTTokenManagerInterface $jwtManager)
    {
        $this->jwtManager = $jwtManager;
        $this->tokenStorageInterface = $tokenStorageInterface;
    }

    #[Route('/auto', name: 'auto_login')]
    #[IsGranted('ROLE_USER', statusCode: 401, message: 'Vous devez vous reconnecter.')]
    public function index(Request $request): Response
    {
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);
        // Récupération du token
        $jwt = $this->tokenStorageInterface->getToken()->getCredentials();

        $data = $serializer->normalize($this->getUser(), null, [
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['password', 'salt', 'username', 'userIdentifier'],
            AbstractNormalizer::CALLBACKS => [
                'birthday' => function ($date) {
                    return $date instanceof \DateTime ? $date->format('Y-m-d') : '';
                }
            ]
        ]);

        $response =  new JsonResponse([
            'jwt' => $jwt,
            'user'  => $data
        ]);

        $response->setStatusCode(200);

        return $response;
    }
}
