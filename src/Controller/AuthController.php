<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api')]
class AuthController extends AbstractController
{
    public function __construct(
        private UserRepository $userRepository,
        private Security $security,
        private SerializerInterface $serializer
    ) {
    }

    /**
     * @throws OptimisticLockException
     * @throws ORMException
     */
    #[Route('/register', name: 'user.register')]
    public function register(Request $request): JsonResponse
    {
        $jsonData = json_decode($request->getContent());

        $user = $this->userRepository->create($jsonData);

        return new JsonResponse(
            [
                'user' => $this->serializer->serialize($user, 'json')
            ],
            201
        );
    }
}