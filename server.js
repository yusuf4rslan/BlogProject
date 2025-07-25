const http = require("http");
const fs = require("fs/promises");
const path = require("path");
const EventEmitter = require("events");
const BlogManager = require("./blogManager");
const blogManager = new BlogManager();

const errorPagePath = path.join(__dirname, "public", "404.html");

blogManager.on("blogCreated", (blog) => {
  blogManager.logActivity(`Blog created: ${blog.title} (ID: ${blog.id})`);
});
blogManager.on("blogRead", (blog) => {
  blogManager.logActivity(`Blog read: ${blog.title} (ID: ${blog.id})`);
});

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>Welcome to the Home Page</h1>");
    } else if (req.url === "/blogs" && req.method === "GET") {
      const blogs = await blogManager.getAllBlogs();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(blogs));
    } else if (req.url.startsWith("/blog/") && req.method === "GET") {
      const blogId = req.url.split("/")[2];
      const blog = await blogManager.readBlog(blogId);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(blog));
    } else if (req.url === "/create" && req.method === "POST") {
      let body = "";
      for await (const chunk of req) {
        body += chunk.toString();
      }
      const { title, content } = JSON.parse(body);
      const newBlog = await blogManager.createBlog(title, content);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newBlog));
    } else {
      throw new Error("Not Found");
    }
  } catch (error) {
    try {
      const errorPage = await fs.readFile(errorPagePath, "utf-8");
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(errorPage);
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  }
});
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
