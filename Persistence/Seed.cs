using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Posts.Any() && !context.Teams.Any() && !context.Players.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var posts = new List<Post>
                {
                    new Post
                    {
                        Title = "Super post",
                        Date = DateTime.UtcNow.AddMonths(-2),
                        Text = "Super text",
                        Author = users[0]
                    },
                    new Post
                    {
                        Title = "Super post",
                        Date = DateTime.UtcNow.AddMonths(-2),
                        Text = "Super text",
                        Author = users[1]
                    }
                };

                var teams = new List<Team>
                {
                    new Team
                    {
                        Name = "ПАРТЫЗАН"
                    },
                    new Team
                    {
                        Name = "СПАРТА"
                    }
                };

                var players = new List<Player>
                {
                    new Player
                    {
                        Name = "Шулаков Андрей",
                        Team = teams[0],
                        Position = "Полузащитник"
                    },
                    new Player
                    {
                        Name = "Ивановский Егор",
                        Team = teams[1],
                        Position = "Защитник"
                    }
                };

                var matches = new List<Match>
                {
                    new Match
                    {
                        FirstTeam = teams[0],
                        SecondTeam = teams[1],
                        GoalsScoredFirstTeam = 3,
                        GoalsScoredSecondTeam = 4
                    }
                };

                await context.Posts.AddRangeAsync(posts);
                await context.Teams.AddRangeAsync(teams);
                await context.Players.AddRangeAsync(players);
                await context.Matches.AddRangeAsync(matches);
                await context.SaveChangesAsync();
            }
        }
    }
}
