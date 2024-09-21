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
            
            await appDbContext.Users.AddAsync(user);
            await appDbContext.SaveChangesAsync();

            return user.Id;
        }

        public async Task<int> Login(UserTemplate insertUser)
        {
            var user = await appDbContext.Users.Where(x => x.Username == insertUser.Username).FirstOrDefaultAsync();

            if (user == null) return -1;
            //compare input password to the hash in the DB
            bool isPasswordValid = BC.EnhancedVerify(insertUser.Password, user.Password);

            if (!isPasswordValid) return -1;

            return user.Id;
        }
    }
}

