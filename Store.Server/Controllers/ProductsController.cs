using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Store.Server.Dto;
using Store.Server.Entities;
using Store.Server.Repositories.Contracts;

namespace Store.Server.Controllers
{
    [Route("/products")]
    [ApiController]
    public class ProductsController(IProductRepository productRepository) : ControllerBase
    {
        private readonly IProductRepository _productRepository = productRepository;

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            try
            {
                return Ok(await _productRepository.GetProducts());
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{mainId}/{altId}", Name = "ProductByIds")]
        public async Task<IActionResult> GetProductByIds(string? mainId, string? altId)
        {
            try
            {
                // Encode ids to treat special characters
                var encodedMainId = Uri.EscapeDataString(mainId ?? "");
                var encodedAltId = Uri.EscapeDataString(altId ?? "");

                var product = await _productRepository.GetProductByIds(encodedMainId, encodedAltId);
                if (product == null)
                    return NotFound();

                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("/products/productNames/{productName}", Name = "ProductByName")]
        public async Task<IActionResult> GetProductByName(string? productName)
        {
            try
            {
                var products = await _productRepository.GetProductsByName(productName);
                if (products == null)
                    return NotFound();

                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] ProductForCreateDto productToCreate)
        {
            try
            {
                var createdProduct = await _productRepository.CreateProduct(productToCreate);
                return CreatedAtRoute("ProductByIds",
                    new
                    {
                        mainId = createdProduct!.IdxCode,
                        altId = createdProduct.IdxCodeAlt
                    },
                    createdProduct
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{mainId}/{altId}")]
        public async Task<IActionResult> UpdateProduct(string? mainId,
            string? altId,
            [FromBody] ProductForUpdateDto product)
        {
            try
            {
                var productToUpdate = await _productRepository.GetProductByIds(mainId, altId);
                if (productToUpdate == null)
                    return NotFound();

                await _productRepository.UpdateProduct(mainId, altId, product);

                return Ok(await _productRepository.GetProductByIds(mainId, altId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{mainId}/{altId}")]
        public async Task<IActionResult> DeleteCompany(string? mainId, string? altId)
        {
            try
            {
                var productToDelete = await _productRepository.GetProductByIds(mainId, altId);
                if (productToDelete == null)
                    return NotFound();

                await _productRepository.DeleteProduct(mainId, altId);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
