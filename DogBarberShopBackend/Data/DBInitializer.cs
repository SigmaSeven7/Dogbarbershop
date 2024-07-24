

using DogBarberShop.Data;
using Microsoft.EntityFrameworkCore;

namespace DogBarberShopBackend.Data
{
    public static class DatabaseInitializer
{
    public static void Initialize(IApplicationBuilder app)
    {
        using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
        {
            var context = serviceScope.ServiceProvider.GetRequiredService<BarberShopDbContext>();
            context.Database.Migrate();
        }
    }
}

}