<?php

namespace App\EventListener;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\Security\Core\User\UserInterface;

use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class AuthenticationSuccessListener
{
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {

        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $user = $event->getUser();

        if (!$user instanceof UserInterface) {
            return;
        }

        $responseData = $event->getData();
        $userData = $serializer->normalize($user, null, [
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['password', 'salt', 'username', 'userIdentifier'],
            AbstractNormalizer::CALLBACKS => [
                'birthday' => function ($date) {
                    return $date instanceof \DateTime ? $date->format('d-m-Y') : '';
                }
            ]
        ]);

        $responseData['user'] = $userData;
        $responseData['jwt'] = $responseData['token'];
        unset($responseData['token']);

        $event->setData(
            $responseData,
        );
    }
}