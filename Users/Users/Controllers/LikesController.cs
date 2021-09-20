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
    
    public class LikesController : ControllerBase
    {

        private readonly AppDbContext context;

        public LikesController(AppDbContext context)
        {
            this.context = context;
        }


        // GET: api/<LikesController>
        [HttpGet]
        public List<Likes> Get()
        {
            return context.Likes.ToList();
        }

        // GET api/<LikesController>/5
        [HttpGet("{id}")]
        public ActionResult<Likes> GetById(int id)
        {
            var item = context.Likes.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        // POST api/<LikesController>
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Likes model)
        {
            if (model == null || model.ID != id)
            {
                return BadRequest();
            }

            var item = context.Likes.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            item.ID = model.ID;
            item.userID = model.userID;
            item.postID = model.postID;
            item.User = model.User;

            context.Likes.Update(item);
            context.SaveChanges();

            return Ok(item);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Likes model)
        {
            if (model != null)
            {
                context.Likes.Add(model);
                context.SaveChanges();
                return Ok(model);
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/<LikesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<LikesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = context.Likes.Find(id);
            if (item == null)
            {
                return NotFound(new { Success = true });

            }

            context.Likes.Remove(item);
            context.SaveChanges();

            return Ok(new { Success = true });
        }
    }
}
