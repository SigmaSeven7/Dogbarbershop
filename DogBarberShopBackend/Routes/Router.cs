
using DogBarberShop.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DogBarberShop.Routes
{
    public class MainRouter : Controller
    {
        public static void DogBarberShopRoutes(IEndpointRouteBuilder app)
        {


            app.MapPost("/login", async ([FromBody] LoginRequest request, [FromServices] BarberShopDbContext dbContext, HttpContext httpContext) =>
            {
                var client = await dbContext.Clients.FirstOrDefaultAsync(c => c.FirstName == request.FirstName && c.Email == request.Email && c.Password == request.Password);
                if (client == null)
                    return Results.Unauthorized();

                return Results.Ok(new { message = "Login successful", client.Id });
            }).WithName("Login").WithOpenApi();

            app.MapPost("/register", async ([FromBody] RegisterRequest request, [FromServices] BarberShopDbContext dbContext) =>
            {
                
                if (string.IsNullOrEmpty(request.Username) ||
                    string.IsNullOrEmpty(request.Password) ||
                    string.IsNullOrEmpty(request.FirstName) ||
                    string.IsNullOrEmpty(request.Email))
                {
                    return Results.BadRequest("All fields are required.");
                }

                // Check if a user with the same email already exists
                var existingUser = await dbContext.Clients.FirstOrDefaultAsync(c => c.Email == request.Email);
                if (existingUser != null)
                {
                    return Results.Conflict("A user with this email already exists.");
                }

                // Create new client
                var newClient = new Client
                {
                    Username = request.Username,
                    Password = request.Password, // In a real app, hash this password
                    FirstName = request.FirstName,
                    Email = request.Email
                };

                dbContext.Clients.Add(newClient);
                await dbContext.SaveChangesAsync();

                return Results.Created($"/clients/{newClient.Id}", new ClientDto
                {
                    Id = newClient.Id,
                    Username = newClient.Username,
                    FirstName = newClient.FirstName,
                    Email = newClient.Email
                });
            })
            .WithName("Register")
            .WithOpenApi();


  app.MapGet("/clients/current", async ([FromServices] BarberShopDbContext dbContext, HttpContext httpContext) =>
            {
                // In a real app, get the current user's ID from the authentication token
                // For now, we'll just get the first client as an example
                var client = await dbContext.Clients.FirstOrDefaultAsync();
                if (client == null)
                    return Results.NotFound();

                var clientDto = new ClientDto
                {
                    Id = client.Id,
                    Username = client.Username,
                    FirstName = client.FirstName,
                    Email = client.Email

                };

                return Results.Ok(clientDto);
            }).WithName("GetCurrentClient").WithOpenApi();

            app.MapPost("/get-client", async (HttpContext httpContext, [FromServices] BarberShopDbContext dbContext, [FromBody] GetClientRequest request) =>
            {

                var clientId = request.ClientId;
               

                if (String.IsNullOrEmpty(clientId))
                {
                    return Results.Unauthorized();
                }

                var client = await dbContext.Clients
                    .Include(c => c.Appointments)  // Include the Appointments
                    .FirstOrDefaultAsync(c => c.Id == Guid.Parse(clientId));

                if (client == null)
                {
                    return Results.NotFound("No client found with this email.");
                }


                var clientDto = new ClientDto
                {
                    Id = client.Id,
                    Username = client.Username,
                    FirstName = client.FirstName,
                    Email = client.Email,
                    Appointments = client.Appointments?.Select(a => new AppointmentDto
                    {
                        Id = a.Id,
                        ClientId = a.ClientId,
                        ClientName = client.FirstName,
                        ScheduledTime = a.ScheduledTime,
                        CreatedAt = a.CreatedAt
                    }).ToList()
                };

                return Results.Ok(clientDto);
            })
            .WithName("GetClient")
            .WithOpenApi();


            // Appointment routes
            app.MapGet("/appointments", async ([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate, [FromQuery] string clientName, [FromServices] BarberShopDbContext dbContext) =>
            {
                var query = dbContext.Appointments.AsQueryable();
                if (startDate.HasValue)
                    query = query.Where(a => a.ScheduledTime >= startDate.Value);
                if (endDate.HasValue)
                    query = query.Where(a => a.ScheduledTime <= endDate.Value);
                if (!string.IsNullOrEmpty(clientName))
                    query = query.Where(a => a.Client.FirstName.Contains(clientName));

                var appointments = await query
                    .Include(a => a.Client)
                    .Select(a => new AppointmentDto
                    {
                        Id = a.Id,
                        ClientId = a.ClientId,
                        ClientName = a.Client.FirstName,
                        ScheduledTime = a.ScheduledTime,
                        CreatedAt = a.CreatedAt
                    })
                    .ToListAsync();

                return Results.Ok(appointments);
            }).WithName("GetAppointments").WithOpenApi();


            app.MapPost("/appointments", async (HttpContext httpContext, [FromBody] AppointmentRequestDto appointmentRequest, [FromServices] BarberShopDbContext dbContext) =>
            {

                var clientId = appointmentRequest.ClientId;
                
                var client = await dbContext.Clients
                    .Include(c => c.Appointments)  
                    .FirstOrDefaultAsync(c => c.Id == Guid.Parse(clientId));

                if (client == null)
                {
                    return Results.NotFound($"No client found");
                }

                var appointment = new Appointment
                {
                    ClientId = client.Id,
                    ScheduledTime = appointmentRequest.ScheduledTime,
                    CreatedAt = DateTime.UtcNow
                };

                if (client.Appointments == null)
                {
                    client.Appointments = new List<Appointment>();
                }

                dbContext.Appointments.Add(appointment);
                client.Appointments.Add(appointment);
                await dbContext.SaveChangesAsync();

                var appointmentDto = new AppointmentDto
                {
                    Id = appointment.Id,
                    ClientId = appointment.ClientId,
                    ClientName = client.FirstName,
                    ScheduledTime = appointment.ScheduledTime,
                    CreatedAt = appointment.CreatedAt
                };

                return Results.Created($"/appointments/{appointment.Id}", appointmentDto);
            })
            .WithName("CreateAppointment")
            .WithOpenApi()
            ;


            app.MapGet("/get-all-appointments", async ([FromServices] BarberShopDbContext dbContext) =>
            {
                var appointments = await dbContext.Appointments
                    .Include(a => a.Client)
                    .OrderBy(a => a.ScheduledTime)
                    .Select(a => new AppointmentDto
                    {
                        Id = a.Id,
                        ClientId = a.ClientId,
                        ClientName = a.Client.FirstName,
                        ScheduledTime = a.ScheduledTime,
                        CreatedAt = a.CreatedAt
                    })
                    .ToListAsync();

                return Results.Ok(appointments);
            })
            .WithName("GetAllAppointments")
            .WithOpenApi();


            app.MapPost("/appointments/{id}/update", async ([FromBody] AppointmentModificationRequest request, Guid id, [FromServices] BarberShopDbContext dbContext) =>
            {
                var appointment = await dbContext.Appointments.FindAsync(id);
                if (appointment == null)
                    return Results.NotFound();

                if (appointment.ClientId.ToString() != request.ClientId)
                    return Results.Unauthorized();

                appointment.ScheduledTime = DateTime.Parse(request.ScheduledTime);

                dbContext.Appointments.Update(appointment);
                await dbContext.SaveChangesAsync();

                return Results.Ok();
            }).WithName("UpdateAppointment").WithOpenApi();


            app.MapPost("/appointments/{id}/delete", async ([FromBody] AppointmentModificationRequest request, Guid id, [FromServices] BarberShopDbContext dbContext) =>
            {
                var appointment = await dbContext.Appointments.FindAsync(id);
                if (appointment == null)
                    return Results.NotFound();
                else
                {
                    var clientId = request.ClientId;
                    if (appointment.ClientId.ToString() != clientId)
                    {
                        return Results.Unauthorized();
                    }
                }
                // In a real app, check if the current user owns this appointment

                dbContext.Appointments.Remove(appointment);
                await dbContext.SaveChangesAsync();
                return Results.Ok();
            }).WithName("DeleteAppointment").WithOpenApi();


            app.MapGet("/appointments/{id}", async (Guid id, [FromServices] BarberShopDbContext dbContext) =>
            {
                var appointment = await dbContext.Appointments
                    .Include(a => a.Client)
                    .FirstOrDefaultAsync(a => a.Id == id);

                if (appointment == null)
                    return Results.NotFound();

                var appointmentDto = new AppointmentDto
                {
                    Id = appointment.Id,
                    ClientId = appointment.ClientId,
                    ClientName = appointment.Client.FirstName,
                    ScheduledTime = appointment.ScheduledTime,
                    CreatedAt = appointment.CreatedAt
                };

                return Results.Ok(appointmentDto);
            }).WithName("GetAppointment").WithOpenApi();


        }
    }
}