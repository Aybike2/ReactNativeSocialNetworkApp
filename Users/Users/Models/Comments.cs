using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Users.Models
{
    public class Comments
    {
        public int ID { get; set; }
        public int userID { get; set; }
        public int postID { get; set; }
        public string Comment { get; set; }
        public DateTime commentDate { get; set; }

    }
}
