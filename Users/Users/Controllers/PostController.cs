using Users.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Users.Models.ViewModel;
using Users.Models.FormModel;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Users.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly AppDbContext context;

        public PostController(AppDbContext context)
        {
            this.context = context;
        }
        // GET: api/<PostController>
        [HttpGet]
        public IActionResult Get([FromQuery] PostQueryModel queryModel)
        {

            var data = (from d in context.Posts
                        join u in context.Users on d.userID equals u.ID
                        orderby d.ID descending
                       select new PostViewModel
                       {
                           ID = d.ID,
                           userID = d.userID,
                           Name = u.Name,
                           Surname=u.Surname,
                           CreatedAt=d.CreatedAt,
                           Description = d.Description,
                           Toka = u.Toka,
                           Likes = (from l in context.Likes
                                    join lu in context.Users on l.userID equals lu.ID
                                    where l.postID == d.ID  
                                    select new 
                                    LikeViewModel 
                                    {
                                       ID = l.ID,
                                       postID = l.postID,
                                       userID = l.userID,
                                       Name   = lu.Name,
                                       Surname = lu.Surname,
                                       Toka = lu.Toka
                                    }).ToList(),
                           Comments = (from c in context.Comments
                                       join cu in context.Users on c.userID equals cu.ID
                                       where c.postID == d.ID
                                       select new
                                       CommentViewModel
                                       {
                                           ID = c.ID,
                                           postID = c.postID,
                                           userID = c.userID,
                                           Name = cu.Name,
                                           Surname = cu.Surname,
                                           Comment = c.Comment,
                                           CommentDate = c.commentDate,
                                           Toka = cu.Toka
                                       }).ToList(),
                       });

            if (queryModel.UserID > 0)
            {
                data = data.Where(d => d.userID == queryModel.UserID);
            }

            return Ok(data.ToList());
        }

        // GET api/<PostController>/5
        [HttpGet("{id}")]
        public ActionResult<Posts> GetById(int id)
        {
            var item = context.Posts.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        // POST api/<PostController>
        [HttpPost]
        public IActionResult Post([FromBody] PostFormModel model)
        {
            if (model != null)
            {
                Posts post = new()
                {
                    userID = model.userID,
                    Description = model.Description,
                    CreatedAt = DateTime.Now,
                    
                };

                context.Posts.Add(post);
                context.SaveChanges();



                return Ok(post);
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/<PostController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Posts model)
        {
            if (model == null || model.ID != id)
            {
                return BadRequest();
            }

            var item = context.Posts.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            item.ID = model.ID;
            item.userID = model.userID;
            item.Description = model.Description;
            item.CreatedAt = model.CreatedAt;

            context.Posts.Update(item);
            context.SaveChanges();

            return Ok(item);
        }

        // DELETE api/<PostController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = context.Posts.Find(id);
            if (item == null)
            {
                return NotFound(new { Success = true });

            }

            context.Posts.Remove(item);
            context.SaveChanges();

            return Ok(new { Success = true });
        }
    }
}
