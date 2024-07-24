
// namespace DogBarberShop.Data{
// public class ClientDto
//     {
//         public Guid Id { get; set; }
//         public string Username { get; set; }
//         public string Email { get; set; }
//         public List<DogDto> Dogs { get; set; }
//     }

//     public class DogDto
//     {
//         public Guid Id { get; set; }
//         public string Name { get; set; }
//         public Guid ClientId { get; set; }
//     }

//     public class Mapper
//     {
//         public ClientDto MapToClientDto(Client client)
//         {
//             return new ClientDto
//             {
//                 Id = client.Id,
//                 Username = client.Username,
//                 Email = client.Email,
//                 Dogs = client.Dogs?.Select(d => new DogDto
//                 {
//                     Id = d.Id,
//                     Name = d.Name,
//                     ClientId = d.ClientId
//                 }).ToList()
//             };
//         }

//         public DogDto MapToDogDto(Dog dog)
//         {
//             return new DogDto
//             {
//                 Id = dog.Id,
//                 Name = dog.Name,
//                 ClientId = dog.ClientId
//             };
//         }
//     }
// }


using System;
using System.Collections.Generic;
using System.Linq;

namespace DogBarberShop.Data
{
    public class ClientDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }

        // public string Password { get; set; }
        public List<AppointmentDto> Appointments { get; set; }
    }

public class AppointmentRequestDto
{
    public DateTime ScheduledTime { get; set; }

    public string ClientId { get; set; }
}
    public class AppointmentDto
    {
        public Guid Id { get; set; }
        public Guid ClientId { get; set; }
        public string ClientName { get; set; }
        public DateTime ScheduledTime { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class Mapper
    {
        public ClientDto MapToClientDto(Client client)
        {
            return new ClientDto
            {
                Id = client.Id,
                Username = client.Username,
                FirstName = client.FirstName,
                Email = client.Email,
                Appointments = client.Appointments?.Select(a => MapToAppointmentDto(a)).ToList()
            };
        }

        public AppointmentDto MapToAppointmentDto(Appointment appointment)
        {
            return new AppointmentDto
            {
                Id = appointment.Id,
                ClientId = appointment.ClientId,
                ClientName = appointment.Client?.FirstName,
                ScheduledTime = appointment.ScheduledTime,
                CreatedAt = appointment.CreatedAt

            };
        }
    }

   
}