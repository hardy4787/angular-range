using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class InspectionType
    {
        public int Id { get; set; }
        [StringLength(20)]
        public string InspectionName { get; set; }
    }
}
