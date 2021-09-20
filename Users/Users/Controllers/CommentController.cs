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

    public class CommentController : ControllerBase
    {
        private readonly AppDbContext context;

        public CommentController(AppDbContext context)
        {
            this.context = context;
        }


        // GET: api/<CommentController>
        [HttpGet]
        public List<Comments> Get()
        {
            return context.Comments.ToList();
        }

        // GET api/<CommentController>/5
        [HttpGet("{id}")]
        public ActionResult<Comments> GetById(int id)
        {
            var item = context.Comments.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Comments model)
        {
            if (model != null)
            {
                context.Comments.Add(model);
                context.SaveChanges();
                return Ok(model);
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/<CommentController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Comments model)
        {
            if (model == null || model.ID != id)
            {
                return BadRequest();
            }

            var item = context.Comments.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            item.ID = model.ID;
            item.userID = model.userID;
            item.postID = model.postID;
            item.Comment = model.Comment;
            item.commentDate = model.commentDate;

            context.Comments.Update(item);
            context.SaveChanges();

            return Ok(item);
        }
        // DELETE api/<CommentController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = context.Comments.Find(id);
            if (item == null)
            {
                return NotFound(new { Success = true });

            }

            context.Comments.Remove(item);
            context.SaveChanges();

            return Ok(new { Success = true });
        }
    }
}
