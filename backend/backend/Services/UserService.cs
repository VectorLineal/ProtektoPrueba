using backend.Data;
using backend.Templates;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext appDbContext;
        public UserService(AppDbContext dbContext)
        {
            appDbContext = dbContext;
        }

        public async System.Threading.Tasks.Task DeleteAsync(int id)
        {
            var user = await appDbContext.Users.SingleAsync(x => x.Id == id);
            appDbContext.Remove(user);

            await appDbContext.SaveChangesAsync();
        }

        public async Task<GetUserTemplate?> GetAsync(int id)
        {
            var user = await appDbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null) return null;
            else return new GetUserTemplate {
                Id = user.Id,
                Username = user.Username,
                Password = user.Password
            };
        }

        public async Task<int> InsertAsync(UserTemplate insertUser)
        {
            string hashedPassword = BC.EnhancedHashPassword(insertUser.Password, 13);
            var user = new User {
                Username = insertUser.Username,
                Password = hashedPassword
            };
            Console.WriteLine(BC.EnhancedVerify(insertUser.Password, hashedPassword));
            await appDbContext.Users.AddAsync(user);
            await appDbContext.SaveChangesAsync();

            return user.Id;
        }
    }
}

