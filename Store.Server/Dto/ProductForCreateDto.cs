namespace Store.Server.Dto
{
    public class ProductForCreateDto
    {
        public string? Name { get; set; }

        public string? IdxCode { get; set; }

        public string? IdxCodeAlt { get; set; }

        public int Price { get; set; }

        public int Quantity { get; set; }
    }
}
