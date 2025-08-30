const fs = require('fs');
const path = require('path');
const url = require('url');
const Sayure = require('../Sayure.js');
class SayureNetworkAttachedStorage {
      static handleRequest(req, res, next) {
        // Diretório base que será exposto via rede
        const ROOT_DIR = path.resolve(__dirname, 'nas-root');
        // Função para evitar acesso fora da pasta raiz
        function safeJoin(base, target) {
          const targetPath = path.resolve(base, target);
          if (!targetPath.startsWith(base)) {
            return null;
          }
          return targetPath;
        }
        const parsedUrl = url.parse(req.originalUrl);
        const pathname = decodeURIComponent(parsedUrl.pathname.replace('/nas', ''));
        const fsPath = safeJoin(ROOT_DIR, pathname);
        if (!fsPath) {
          res.writeHead(403);
          res.end('Acesso negado');
          return;
        }
        fs.stat(fsPath, (err, stats) => {
          if (err) {
            res.writeHead(404);
            res.end('Arquivo ou diretório não encontrado');
            return;
          }
          if (stats.isDirectory()) {
            fs.readdir(fsPath, (err, files) => {
              if (err) {
                res.writeHead(500);
                res.end('Erro ao listar diretório');
                return;
              }
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.write(`<h2>Índice de ${pathname}</h2><ul>`);
              if (pathname !== '/') {
                res.write(`<li><a href="${path.join('/nas', pathname, '..')}">../</a></li>`);
              }
              files.forEach(file => {
                const fileUrl = path.join('/nas', pathname, file);
                res.write(`<li><a href="${fileUrl}">${file}</a></li>`);
              });
              res.end('</ul>');
            });
          } else if (stats.isFile()) {
            const fileStream = fs.createReadStream(fsPath);
            res.writeHead(200, {
              'Content-Type': 'application/octet-stream',
              'Content-Disposition': `attachment; filename="${path.basename(fsPath)}"`
            });
            fileStream.pipe(res);
          } else {
            res.writeHead(403);
            res.end('Tipo não suportado');
          }
        });
      }
    }
module.exports = SayureNetworkAttachedStorage;