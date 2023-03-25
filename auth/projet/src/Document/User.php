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

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;


#[MongoDB\Document(collection: 'users', repositoryClass: UserRepository::class)]
#[MongoDB\Unique(fields: 'email')]

class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * @MongoDB\Id
     */
    #[MongoDB\Id(strategy: "INCREMENT")]
    #[Ignore]
    protected string $id;

    #[MongoDB\Field(type: 'string')]
    #[Assert\NotBlank]
    #[Assert\Email]
    protected ?string $email = null;

    #[MongoDB\Field(type: 'string')]
    #[Assert\NotBlank]
    protected ?string $firstname = null;

    #[MongoDB\Field(type: 'string')]
    #[Assert\NotBlank]
    protected ?string $lastname = null;

    #[MongoDB\Field(type: 'string')]
    #[Assert\NotBlank]
    protected ?string $password = null;

    #[MongoDB\Field(type: 'date')]
    #[Assert\NotBlank]
    #[Assert\DateTime]
    protected ?\DateTimeInterface $birthday = null;

    
    #[MongoDB\Field(type: 'boolean')]
    #[Assert\NotBlank]
    protected ?bool $resetPassword = false;

    #[MongoDB\Field(type: "collection")]
    private array $roles = [];


    // Jobs :
    #[MongoDB\ReferenceOne(targetDocument: Job::class)]
    private ?Job $currentJob = null;

    #[MongoDB\ReferenceMany(targetDocument: Job::class)]
    private Collection $oldJobs;


    public function __construct()
    {
        $this->oldJobs = new ArrayCollection();
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }
    public function getUsername(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $firstname): void
    {
        $this->email = $firstname;
    }
    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    public function getFirstName(): ?string
    {
        return $this->firstname;
    }

    public function setFirstName(?string $firstname): void
    {
        $this->firstname = $firstname;
    }

    public function getLastName(): ?string
    {
        return $this->lastname;
    }

    public function setLastName(?string $lastname): void
    {
        $this->lastname = $lastname;
    }


    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getBirthday(): ?\DateTimeInterface
    {
        return $this->birthday;
    }

    public function setBirthday(?\DateTimeInterface $birthday): self
    {
        $this->birthday = $birthday;

        return $this;
    }
    
    public function isResetPassword(): ?bool
    {
        return $this->resetPassword;
    }

    public function setResetPassword(bool $resetPassword): self
    {
        $this->resetPassword = $resetPassword;

        return $this;
    }

    public function getCurrentJob(): ?Job
    {
        return $this->currentJob;
    }

    public function setCurrentJob(?Job $currentJob): self
    {
        $this->currentJob = $currentJob;

        return $this;
    }

    /**
     * @return Collection<int, Job>
     */
    public function getOldJobs(): Collection
    {
        return $this->oldJobs;
    }

    public function addOldJob(Job $job): self
    {
        if (!$this->oldJobs->contains($job)) {
            $this->oldJobs->add($job);
        }

        return $this;
    }

    public function removeOldJobs(Job $job): self
    {
        $this->oldJobs->removeElement($job);

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }
}