using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Users.Models.ViewModel
{
    public class PostViewModel
    {
        public int ID { get; set; }

        public int userID { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }

        public List<LikeViewModel> Likes { get; set; }
        public List<CommentViewModel> Comments { get; set; }
        public string Surname { get; set; }

        
        public DateTime? CreatedAt { get; set; }

        public string Toka { get; set; }

    }
}
