using Microsoft.EntityFrameworkCore;

namespace DogBarberShop.Data
{
    public class BarberShopDbContext : DbContext
    {
        public BarberShopDbContext(DbContextOptions<BarberShopDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Client>()
                .HasKey(c => c.Id);

            modelBuilder.Entity<Appointment>()
                .HasKey(a => a.Id);

            modelBuilder.Entity<Client>()
                .HasMany(c => c.Appointments)
                .WithOne(a => a.Client)
                .HasForeignKey(a => a.ClientId);
        }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
    }

    // Entity classes
    public class Client
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; } // Store hashed password
        public string FirstName { get; set; }
        public string Email { get; set; }
        public virtual ICollection<Appointment> Appointments { get; set; }
    }

    public class Appointment
    {
        public Guid Id { get; set; }
        public Guid ClientId { get; set; }
        public DateTime ScheduledTime { get; set; }
        public DateTime CreatedAt { get; set; }
        public virtual Client Client { get; set; }
    }

    // DTO classes
    public class LoginRequest
    {
        public string FirstName { get; set; }
        public string Password { get; set; }

        public string Email { get; set; }
    }

     public class GetClientRequest
    {
    public string ClientId { get; set; }
    }

      public class AppointmentModificationRequest
    {
        public string ClientId { get; set; }

        public string ScheduledTime { get; set; }
    }
    public class RegisterRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
    }
}