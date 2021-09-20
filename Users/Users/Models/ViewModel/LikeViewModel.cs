using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Users.Models.ViewModel
{
    public class LikeViewModel
    {
        public int ID { get; set; }

        public int userID { get; set; }
        public int postID { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Toka { get; set; }

    }
}
