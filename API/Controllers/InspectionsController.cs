using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class InspectionsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly JwtSettings _jwtSettings;

        public InspectionsController(DataContext context, JwtSettings jwtSettings)
        {
            _context = context;
            _jwtSettings = jwtSettings;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Inspection>>> GetInspections()
        {
            Trace.WriteLine(_jwtSettings.TokenLifetime.TotalSeconds);
            Trace.WriteLine(_jwtSettings.TokenLifetime.TotalSeconds);
            return await _context.Inspection.ToListAsync();
        }
        
        [HttpGet("id")]
        public async Task<ActionResult<Inspection>> GetInspection(int id)
        {
            var inspection = await _context.Inspection.FindAsync(id);

            if (inspection == null)
            {
                return NotFound();
            }

            return inspection;
        }
        
        [HttpPut("id")]
        public async Task<IActionResult> PutInspection(int id, Inspection inspection)
        {
            if (id != inspection.Id)
            {
                return BadRequest();
            }

            _context.Entry(inspection).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InspectionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Inspection>> PostInspection(Inspection inspection)
        {
            _context.Inspection.Add(inspection);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInspection", new { id = inspection.Id }, inspection);
        }

        [HttpPost("save")]
        public async Task<ActionResult<IEnumerable<Inspection>>> SaveInspections(List<Inspection> inspections)
        {
            inspections.ForEach(inspection =>
            {
                if (inspection.Id != 0)
                {
                    _context.Entry(inspection).State = EntityState.Modified;
                } else
                {
                    _context.Inspection.Add(inspection);
                }
            });
            await _context.SaveChangesAsync();

            return await GetInspections();
        }

        [HttpDelete("id")]
        public async Task<IActionResult> DeleteInspection(int id)
        {
            var inspection = await _context.Inspection.FindAsync(id);
            if (inspection == null)
            {
                return NotFound();
            }

            _context.Inspection.Remove(inspection);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InspectionExists(int id)
        {
            return _context.Inspection.Any(e => e.Id == id);
        }
    }
}
