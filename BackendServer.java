import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.*;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.Paths;

/**
 * FoodHub Java Backend Server
 * Built with standard Java SE (HttpServer) - Zero external dependencies!
 * Serves static frontend files and REST API endpoints.
 * 
 * To compile: javac BackendServer.java
 * To run:     java BackendServer
 */
public class BackendServer {
    private static final int PORT = 8080;

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);

        // API Handler
        server.createContext("/api/menu", new StaticFileApiHandler("data/menu.json", "application/json"));
        server.createContext("/api/coupons", new StaticFileApiHandler("data/coupons.json", "application/json"));
        server.createContext("/api/rewards", new StaticFileApiHandler("data/rewards.json", "application/json"));
        server.createContext("/api/orders", new StaticFileApiHandler("data/orders.json", "application/json"));
        server.createContext("/api/health", new HealthHandler());

        // Static Files Handler (serves index.html, style.css, app.js, images, etc.)
        server.createContext("/", new StaticFileHandler());

        server.setExecutor(null); // creates a default executor
        System.out.println("==================================================");
        System.out.println("  FoodHub Java Backend Server Started!           ");
        System.out.println("  Running on: http://localhost:" + PORT);
        System.out.println("==================================================");
        server.start();
    }

    // Health Handler
    static class HealthHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            addCorsHeaders(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }
            String response = "{\"status\":\"online\",\"service\":\"FoodHub Java Backend\",\"port\":" + PORT + "}";
            byte[] bytes = response.getBytes("UTF-8");
            exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
            exchange.sendResponseHeaders(200, bytes.length);
            OutputStream os = exchange.getResponseBody();
            os.write(bytes);
            os.close();
        }
    }

    // Static File API Handler (serves JSON files for APIs)
    static class StaticFileApiHandler implements HttpHandler {
        private final String relativeFilePath;
        private final String contentType;

        public StaticFileApiHandler(String relativeFilePath, String contentType) {
            this.relativeFilePath = relativeFilePath;
            this.contentType = contentType;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            addCorsHeaders(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            File file = new File(relativeFilePath);
            if (!file.exists()) {
                String notFound = "{\"success\":false,\"message\":\"File not found\"}";
                byte[] notFoundBytes = notFound.getBytes("UTF-8");
                exchange.getResponseHeaders().set("Content-Type", "application/json");
                exchange.sendResponseHeaders(404, notFoundBytes.length);
                OutputStream os = exchange.getResponseBody();
                os.write(notFoundBytes);
                os.close();
                return;
            }

            byte[] bytes = Files.readAllBytes(file.toPath());
            exchange.getResponseHeaders().set("Content-Type", contentType + "; charset=UTF-8");
            exchange.sendResponseHeaders(200, bytes.length);
            OutputStream os = exchange.getResponseBody();
            os.write(bytes);
            os.close();
        }
    }

    // General Static File Handler for Frontend HTML/CSS/JS/images
    static class StaticFileHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            addCorsHeaders(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            String path = exchange.getRequestURI().getPath();
            if (path == null || path.equals("/") || path.isEmpty()) {
                path = "/index.html";
            }

            // Clean path
            if (path.startsWith("/")) {
                path = path.substring(1);
            }

            File file = new File(path);
            if (!file.exists() || file.isDirectory()) {
                file = new File("index.html");
            }

            String mimeType = getMimeType(file.getName());
            byte[] fileBytes = Files.readAllBytes(file.toPath());

            exchange.getResponseHeaders().set("Content-Type", mimeType);
            exchange.sendResponseHeaders(200, fileBytes.length);
            OutputStream os = exchange.getResponseBody();
            os.write(fileBytes);
            os.close();
        }

        private String getMimeType(String filename) {
            String lower = filename.toLowerCase();
            if (lower.endsWith(".html") || lower.endsWith(".htm")) return "text/html; charset=UTF-8";
            if (lower.endsWith(".css")) return "text/css; charset=UTF-8";
            if (lower.endsWith(".js")) return "application/javascript; charset=UTF-8";
            if (lower.endsWith(".json")) return "application/json; charset=UTF-8";
            if (lower.endsWith(".png")) return "image/png";
            if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
            if (lower.endsWith(".svg")) return "image/svg+xml";
            if (lower.endsWith(".ico")) return "image/x-icon";
            return "application/octet-stream";
        }
    }

    private static void addCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
        exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
}
