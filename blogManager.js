const path = require("path");
const fs = require("fs/promises");
const EventEmitter = require("events");

class BlogManager extends EventEmitter {
  constructor() {
    super();
    this.blogsPath = path.join(__dirname, "blogs");
    this.logsPath = path.join(__dirname, "logs");
  }

  async createBlog(title, content) {
    const files = await fs.readdir(this.blogsPath);
    const ids = files
      .filter((file) => file.startsWith("blog-") && file.endsWith(".json"))
      .map((file) =>
        parseInt(file.replace("blog-", "").replace(".json", ""), 10)
      );
    const newId = (ids.length > 0 ? Math.max(...ids) : 0) + 1;
    const newBlog = {
      id: newId.toString(),
      title,
      content,
      date: new Date().toISOString().split("T")[0],
      readCount: 0,
    };
    const filePath = path.join(this.blogsPath, `blog-${newId}.json`);
    await fs.writeFile(filePath, JSON.stringify(newBlog, null, 2));
    this.emit("blogCreated", newBlog);
    return newBlog;
  }

  async readBlog(id) {
    const filePath = path.join(this.blogsPath, `blog-${id}.json`);
    const blogContent = await fs.readFile(filePath, "utf-8");
    const blog = JSON.parse(blogContent);
    this.emit("blogRead", blog);
    return blog;
  }

  async getAllBlogs() {
    const files = await fs.readdir(this.blogsPath);
    const jsonFiles = files.filter((file) => path.extname(file) === ".json");
    const readPromises = jsonFiles.map((file) => {
      return fs.readFile(path.join(this.blogsPath, file), "utf-8");
    });
    const blogContents = await Promise.all(readPromises);
    return blogContents.map((content) => JSON.parse(content));
  }

  async logActivity(message) {
    try {
      await fs.access(this.logsPath);
    } catch (error) {
      await fs.mkdir(this.logsPath);
    }
    const logMessage = `[${new Date().toISOString()}] ${message}\n`;
    await fs.appendFile(path.join(this.logsPath, "activity.log"), logMessage);
  }
}

module.exports = BlogManager;
