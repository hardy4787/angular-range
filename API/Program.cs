﻿using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using NotesMinimalAPI.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Data;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Identity;

var adminRole = new Role("admin");
var userRole = new Role("user");
var people = new List<Person>
{
    new Person("tom@gmail.com", "12345", adminRole),
    new Person("bob@gmail.com", "55555", userRole),
};
var builder = WebApplication.CreateBuilder(args);

InstallIdentity();
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
InstallSwagger();


var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var jwtSettings = new JwtSettings();

InstallJwtAuthorization();

builder.Services.AddDbContext<DataContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddSingleton(jwtSettings);
builder.Services.AddScoped<IIdentityService, IdentityService>();
builder.Configuration.Bind(nameof(jwtSettings), jwtSettings);
builder.Services.AddAuthorization();

var myAllowSpecificOrigins = "_myAllowSpecificOrigins";
InstallCors();

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseCors(myAllowSpecificOrigins);
app.UseAuthentication();
app.UseAuthorization();
app.Map("/login", (Person loginData) =>
{
    // находим пользователя 
    Person? person = people.FirstOrDefault(p => p.Email == loginData.Email && p.Password == loginData.Password);
    // если пользователь не найден, отправляем статусный код 401
    if (person is null) return Results.Unauthorized();
    var claims = new List<Claim> { new Claim(ClaimTypes.Name, person.Email), new Claim(ClaimTypes.Role, person.Role.Name) };
    // создаем JWT-токен
    var jwt = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(2)),
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret)), SecurityAlgorithms.HmacSha256));

    var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

    var response = new
    {
        accessToken = encodedJwt,
        username = person.Email
    };

    return Results.Json(response);
});

app.MapControllers();

app.Run();

void InstallIdentity()
{
    builder.Services.AddDbContext<IdentityContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("IdentityConnection")));
    builder.Services.AddIdentity<User, IdentityRole>().AddEntityFrameworkStores<IdentityContext>();
}

void InstallSwagger()
{
    builder.Services.AddSwaggerGen(s =>
    {
        var security = new Dictionary<string, IEnumerable<string>>
        {
            { "Bearer", new string[0] }
        };

        s.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Description = "JWT Authorization header using the bearer scheme",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey,
            Scheme = JwtBearerDefaults.AuthenticationScheme,
        });
        s.AddSecurityRequirement(new OpenApiSecurityRequirement()
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = JwtBearerDefaults.AuthenticationScheme
                    },
                    Name = JwtBearerDefaults.AuthenticationScheme,
                    In = ParameterLocation.Header,

                },
                new List<string>()
            }
        });
    });
}

void InstallJwtAuthorization()
{
    var tokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        RequireExpirationTime = false,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret)),
        ValidateIssuerSigningKey = true,
    };

    builder.Services.AddSingleton(tokenValidationParameters);

    builder.Services.AddAuthentication(a =>
    {
        a.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        a.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        a.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.TokenValidationParameters = tokenValidationParameters;
    });
}

void InstallCors()
{
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: myAllowSpecificOrigins,
            builder =>
            {
                builder.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
            });
    });
}

public class JwtSettings
{
    public string Secret { get; set; }
    public TimeSpan TokenLifetime { get; set; }
}

public record Person(string Email, string Password, Role Role);
public class Role
{
    public string Name { get; set; }
    public Role(string name) => Name = name;
}