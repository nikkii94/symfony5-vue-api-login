<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/profile')]
class UserController extends AbstractController
{
    public function __construct(
        private Security $security,
        private SerializerInterface $serializer
    ) {
    }

    #[Route('', name: 'user.profile')]
    public function profile(Request $request): JsonResponse
    {
        $currentUser = $this->security->getUser();
        $user = $this->serializer->serialize($currentUser, 'json');

        return new JsonResponse(
            $user,
            200
        );
    }
}