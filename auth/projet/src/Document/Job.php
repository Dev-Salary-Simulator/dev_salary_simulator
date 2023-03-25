<?php
// src/Document/User.php
namespace App\Document;
use App\Repository\UserRepository;
use Doctrine\Bundle\MongoDBBundle\Validator\Constraints\Unique as MongoDBUnique;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Ignore;


#[MongoDB\Document(collection: 'jobs', repositoryClass: JobRepository::class)]

class Job
{
    /**
     * @MongoDB\Id
     */
    #[MongoDB\Id]
    #[Ignore]
    protected $id;

    #[MongoDB\Field(type: 'string')]
    #[Assert\NotBlank]
    protected ?string $region;

    #[MongoDB\Field(type: 'string')]
    #[Assert\NotBlank]
    protected ?string $title;

    #[MongoDB\Field(type: 'integer')]
    #[Assert\NotBlank]
    protected ?int $experience;

    #[MongoDB\Field(type: 'raw')]
    private string|array|null $stack = [];

    #[MongoDB\Field(type: 'int')]
    #[Assert\NotBlank]
    protected ?int $salary;


    #[MongoDB\Field(type: 'string')]
    protected ?string $status;

    #[MongoDB\ReferenceOne(targetDocument: User::class)]
    protected ?string $user;


    public function getId(): string
    {
        return (string) $this->id;
    }

    public function getRegion(): string
    {
        return $this->region;
    }

    public function setRegion(?string $region): void
    {
        $this->region = $region;
    }


    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(?string $title): void
    {
        $this->title = $title;
    }

    public function getExperience(): int
    {
        return $this->experience;
    }

    public function setExperience(?int $experience): void
    {
        $this->experience = $experience;
    }

    public function getStack(): array|string|null
    {
        return $this->stack;
    }

    public function setStack(array|string $stack): self
    {
        $this->stack = $stack;
        return $this;
    }

    public function addStack(string $stack): self
    {
        if (!in_array($stack, $this->stack, true)) {
            $this->stack[] = $stack;
        }
        return $this;
    }

    public function removeStack(string $stack): self
    {
        if (($key = array_search($stack, $this->stack, true)) !== false) {
            unset($this->stack[$key]);
        }
        return $this;
    }

    public function getSalary(): int
    {
        return $this->salary;
    }

    public function setSalary(?int $salary): void
    {
        $this->salary = $salary;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setCurrentJob(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

}