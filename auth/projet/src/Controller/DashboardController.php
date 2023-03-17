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


#[Route('/api/user', name: "api_")]
class DashboardController extends AbstractController
{
    #[Route('/profile', name: 'profile')]
    #[IsGranted('ROLE_USER', statusCode: 401, message: 'Vous devez vous connecter pour accéder à cette page.')]
    public function index(): Response
    {
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $data = $serializer->normalize($this->getUser(), null, [
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['password', 'salt', 'username', 'userIdentifier'],
            AbstractNormalizer::CALLBACKS => [
                'birthday' => function ($date) {
                    return $date instanceof \DateTime ? $date->format('d-m-Y') : '';
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
}
