using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Users.Models.FormModel
{

    public class PostQueryModel
    {
        public int UserID { get; set; }
    }

    public class PostFormModel
    {
        public int ID { get; set; }

        public int userID { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
