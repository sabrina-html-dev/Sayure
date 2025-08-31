const { sayure, Sayure } = require('../Sayure');
const fs = require('fs');
const http = require('http');
const jwt = require('jsonwebtoken');
class SayureWhatICanDo {
    static Skils = {};
  static SearchCache = {};
  static DiagnosticLog = [];

  // 2. Cache de módulos carregados
  static SearchForModules() {
    const folder = "./modules/skils/";
    const FilesAndFolders = fs.readdirSync(folder);

    for (let i = 0; i < FilesAndFolders.length; i++) {
      const file = FilesAndFolders[i];
      if (!file.endsWith('.js')) continue;

      const skilName = file.replace('.js', '');

      if (this.Skils[skilName]) {
        this.log('debug', `Skill "${skilName}" já carregada (cache).`);
        continue;
      }

      const modulePath = path.join(__dirname, folder, file);

      try {
        const skilModule = require(modulePath);

        // 4. Validação
        if (typeof skilModule.run !== 'function') {
          this.log('warn', `Skill "${skilName}" inválida (sem método run).`);
          continue;
        }

        this.Skils[skilName] = skilModule;
        Sayure.envBus.emit('diagnostic', {
          type: 'skill_loaded',
          skill: skilName,
          timestamp: new Date().toISOString()
        });

        // 3. Auditoria de uso
        this.audit('Skill carregada', skilName);

      } catch (err) {
        this.log('error', `Erro ao carregar skill ${skilName}: ${err.message}`);
      }
    }
  }

  static JWTTokenGenerator(username, iat, exp) {
    const secretKey = process.env.JWT_SECRET || 'fallback_key';
    try {
      const payload = { username, iat, exp };
      const token = jwt.sign(payload, secretKey);

      sayure.envBus.emit('diagnostic', {
        type: 'jwt_generated',
        username,
        timestamp: new Date().toISOString()
      });

      return token;
    } catch (error) {
      Sayure.envBus.emit('diagnostic', {
        type: 'jwt_generation_error',
        username,
        error: error.message,
        timestamp: new Date().toISOString()
      });

      this.log('error', `Erro ao gerar token: ${error.message}`);
      return null;
    }
  }

  static SearchForInformation(incognitus) {
    const now = Math.floor(Date.now() / 1000);
    const exp = now + (60 * 60);
    const token = this.JWTTokenGenerator("Sayure_AI", now, exp);

    if (!token) return;

    const engines = [
      'www.google.com/search?client=firefox-b-e&channel=entpr&q=\\',
      'www.bing.com/search?q=\\form=QBLH',
      'duckduckgo.com/?t=h_&q=s\\'
    ];

    const userAgentEntries = Object.entries(SayureHypertextTransferProtocol.UserAgentCollection);

    for (let i = 0; i < engines.length; i++) {
      const [device, userAgent] = userAgentEntries[i % userAgentEntries.length];
      const searchURL = engines[i].split('\\')[0] + incognitus + engines[i].split('\\')[1];

      const cached = this.SearchCache[searchURL];
      if (cached) {
        this.log('info', `Modo offline: resposta de cache usada para ${searchURL}`);
        continue;
      }

      const options = {
        hostname: searchURL,
        port: 80,
        path: '/',
        method: 'GET',
        timeout: 5000, // 7. Timeout
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-Sayure-Version': '1.0',
          'X-Request-Source': 'Sayure-AI',
          'X-Request-ID': Date.now().toString() + '-' + i,
          'User-Agent': userAgent
        }
      };

      Sayure.envBus.emit('diagnostic', {
        type: 'search_request_started',
        engine: searchURL,
        device,
        userAgent,
        timestamp: new Date().toISOString()
      });

      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          this.log('info', `Resposta de ${searchURL} recebida.`);
          this.SearchCache[searchURL] = data; // 6. Cache para modo offline
        });
      });

      req.on('error', (err) => {
        this.log('error', `Erro na requisição: ${err.message}`);
        Sayure.envBus.emit('diagnostic', {
          type: 'search_request_error',
          engine: searchURL,
          error: err.message,
          timestamp: new Date().toISOString()
        });
      });

      req.on('timeout', () => {
        req.abort();
        this.log('warn', `Timeout em ${searchURL}`);
        Sayure.envBus.emit('diagnostic', {
          type: 'search_timeout',
          engine: searchURL,
          timestamp: new Date().toISOString()
        });
      });

      req.end();
    }
  }

  // 5. Logger com níveis
  static log(level, message) {
    const levels = ['debug', 'info', 'warn', 'error'];
    if (!levels.includes(level)) level = 'info';

    const logMsg = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`;
    console.log(logMsg);

    this.DiagnosticLog.push({ level, message, timestamp: new Date().toISOString() });
  }

  // 3. Simples Auditoria
  static audit(action, target) {
    this.log('info', `Auditoria: ${action} => ${target}`);
  }

  // 8. Dashboard básico CLI
  static Dashboard() {
    console.log("\n=== STATUS DASHBOARD ===");
    console.log("Skills carregadas:", Object.keys(this.Skils).length);
    console.log("Cache de busca:", Object.keys(this.SearchCache).length);
    console.log("Logs recentes:");
    this.DiagnosticLog.slice(-5).forEach((log) => {
      console.log(` - [${log.level}] ${log.message}`);
    });
    console.log("========================\n");
  }
}
module.exports = SayureWhatICanDo;