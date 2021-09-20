using Users.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Users.Models.ViewModel;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Users.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext context;

        public UserController(AppDbContext context)
        {
            this.context = context;
        }

        // GET: api/<ContactController>
        [HttpGet]
        public List<User> Get()
        {
            return context.Users.ToList();
        }

        // GET api/<ContactController>/5
        [HttpGet("{id}")]
        public ActionResult<User> GetById(int id)
        {
            var item = context.Users.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        // POST api/<ContactController>
        [HttpPost]
        public IActionResult Post([FromBody] User model)
        {
            if (model != null)
            {
                context.Users.Add(model);
                context.SaveChanges();
                return Ok(model);
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/<ContactController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] User model)
        {
            if (model == null || model.ID != id)
            {
                return BadRequest();
            }

            var item = context.Users.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            item.ID = model.ID;
            item.Name = model.Name;
            item.Surname = model.Surname;
            item.PhoneNumber = model.PhoneNumber;
            item.Email = model.Email;
            item.Password = model.Password;

            context.Users.Update(item);
            context.SaveChanges();

            return Ok(item);
        }

        // DELETE api/<ContactController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = context.Users.Find(id);
            if (item == null)
            {
                return NotFound(new { Success = true });

            }

            context.Users.Remove(item);
            context.SaveChanges();

            return Ok(new { Success = true });
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] User model)
        {
            if (model != null)
            {
                User user = context.Users.Where(c => c.Email == model.Email && c.Password == model.Password).FirstOrDefault();

                if (user != null)
                {
                    // başlangıç Update Users set Toka=NULL WHERE Toka = @Toka and ID!=@ID
                    var ayniTokayaSahipUserlar = context.Users.Where(u => u.Toka == model.Toka && u.ID != user.ID).ToList();

                    ayniTokayaSahipUserlar.ForEach(tokaUseri => 
                    {
                        tokaUseri.Toka = "";
                    });
                    // bitiş Update Users set Toka=NULL WHERE Toka = @Toka and ID!=@ID

                    user.Toka = model.Toka;

                    context.SaveChanges();
                }

                UserViewModel viewModel = new()
                {
                    User = user,
                    Message = user != null ? "Giriş Başarılı" : "Giriş Başarısız",
                    Result = user != null ? true : false
                }; 

                return Ok(viewModel);
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
