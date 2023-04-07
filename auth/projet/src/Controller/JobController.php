<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Document\User;
use App\Repository\UserRepository;
use App\Document\Job;
use App\Repository\JobRepository;

use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;
use Symfony\Component\HttpFoundation\Request;

#[Route('/api/user', name: "api_")]
class JobController extends AbstractController
{
    private $doctrine;
    private $jobRepository;  
    private $encoders;
    private $normalizers;
    private $serializer;  

    public function __construct(DocumentManager $doctrine, JobRepository $jobRepository)
    {
        $this->doctrine = $doctrine;
        $this->jobRepository = $jobRepository;
        $this->encoders = [new XmlEncoder(), new JsonEncoder()];
        $this->normalizers = [new ObjectNormalizer()];
        $this->serializer = new Serializer($this->normalizers, $this->encoders);
    }

    #[Route('/job', name: 'current_user_job', methods: ['POST','PUT'])]
    #[IsGranted('ROLE_USER', statusCode: 401, message: 'Vous devez vous reconnecter.')]
    public function index(Request $request): Response
    {
        $decoded = json_decode($request->getContent());
        $title = $decoded->nameJob;
        $stack = $decoded->nameStack;
        $salary = $decoded->salary;
        $experience = $decoded->experience;

        $job = null;
        if(!is_null($this->getUser()->getCurrentJob())){
            $job = $this->getUser()->getCurrentJob();
        }else{
            $job = new Job();
        }
        $job->setTitle($title);

        $job->setStack($stack);
        
        $job->setSalary($salary);
        $job->setExperience($experience);
        $this->doctrine->persist($job);

        $this->getUser()->setCurrentJob($job);
        $this->doctrine->flush();

        $data = $this->serializer->normalize($job, null, []);

        $response =  new JsonResponse([
            'currentJob'  => $data
        ]);

        $response->setStatusCode(200);

        return $response;


        // $jobs = $this->jobRepository->findAllJobs();

        // foreach($jobs as $job){
        //     echo $job->getRegion().'<br>';
        // }
        // dd('Coucou :)');

    }


    #[Route('/job', name: 'remove_current_user_job', methods: ['PATCH'])]
    #[IsGranted('ROLE_USER', statusCode: 401, message: 'Vous devez vous reconnecter.')]
    public function removeCurrentJob(): Response
    {
        if(is_null($this->getUser()->getCurrentJob())){
            $response = new JsonResponse(['message' => 'Vous n\'avez pas de job actuel.']);
            $response->setStatusCode(404, 'Vous n\'avez pas de job actuel.');

            return $response;
        }
        $this->getUser()->addOldJob($this->getUser()->getCurrentJob());
        $this->getUser()->setCurrentJob(null);
        $this->doctrine->flush();

        $data = $this->serializer->normalize($this->getUser(), null, [
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['password', 'salt', 'username', 'userIdentifier'],
            AbstractNormalizer::CALLBACKS => [
                'birthday' => function ($date) {
                    return $date instanceof \DateTime ? $date->format('d-m-Y') : '';
                }
            ]
        ]);

        $response =  new JsonResponse([
            'user'  => $data
        ]);

        $response->setStatusCode(200);

        return $response;
    }
}
