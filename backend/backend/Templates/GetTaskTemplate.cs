﻿namespace backend.Templates
{
    public class GetTaskTemplate
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime PublishedOn { get; set; }
        public bool Completed { get; set; }
    }
}
