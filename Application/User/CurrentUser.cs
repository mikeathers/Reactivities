using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
  public class CurrentUser
  {
    public class Query : IRequest<User>
    {
      public string Email { get; set; }
      public string Password { get; set; }
    }

    public class QueryValidator : AbstractValidator<Query>
    {
      public QueryValidator()
      {
        RuleFor(x => x.Email).NotEmpty();
        RuleFor(x => x.Password).NotEmpty();
      }
    }

    public class Handler : IRequestHandler<Query, User>
    {
      private readonly UserManager<AppUser> _userManage;
      private readonly IJwtGenerator _jwtGenerator;
      private readonly IUserAccessor _userAccessor;

      public Handler(UserManager<AppUser> userManage, IJwtGenerator jwtGenerator, IUserAccessor userAccessor)
      {
        _userAccessor = userAccessor;
        _jwtGenerator = jwtGenerator;
        _userManage = userManage;
      }

      public async Task<User> Handle(Query request, CancellationToken cancellationToken)
      {
        var user = await _userManage.FindByNameAsync(_userAccessor.GetCurrentUsername());

        return new User
        {
          DisplayName = user.DisplayName,
          Token = _jwtGenerator.CreateToken(user),
          Username = user.UserName,
          Image = null
        };
      }
    }
  }
}