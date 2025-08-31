// Sayure.Modules/SayureReadCompareRewriteClasses.js
const fs = require("fs");
const path = require("path");
const Sayure = require("./SayureCore");

class SayureReadCompareRewriteClasses {
    constructor(basePath = path.resolve(__dirname)) {
        this.basePath = basePath; // Onde ficam as classes
        this.memory = {}; // Histórico de alterações
    }

    /**
     * Lê o conteúdo de uma classe.
     */
    readClass(fileName) {
        try {
            const filePath = path.join(this.basePath, fileName);
            const content = fs.readFileSync(filePath, "utf-8");

            Sayure.envBus.emit("diagnostic", {
                module: "SayureReadCompareRewriteClasses",
                action: "readClass",
                file: fileName,
                status: "success"
            });

            return content;
        } catch (err) {
            Sayure.envBus.emit("diagnostic", {
                module: "SayureReadCompareRewriteClasses",
                action: "readClass",
                file: fileName,
                status: "error",
                error: err.message
            });
            return null;
        }
    }

    /**
     * Compara versão atual da classe com nova versão sugerida.
     */
    compareClasses(oldContent, newContent) {
        let differences = [];
        if (oldContent !== newContent) {
            // Aqui poderia ser implementado um diff mais avançado
            differences.push("Diferença detectada no conteúdo da classe.");
        }

        Sayure.envBus.emit("diagnostic", {
            module: "SayureReadCompareRewriteClasses",
            action: "compareClasses",
            differences
        });

        return differences;
    }

    /**
     * Reescreve a classe no disco.
     */
    rewriteClass(fileName, newContent) {
        try {
            const filePath = path.join(this.basePath, fileName);
            fs.writeFileSync(filePath, newContent, "utf-8");

            // Guarda histórico de alteração
            if (!this.memory[fileName]) this.memory[fileName] = [];
            this.memory[fileName].push({
                timestamp: new Date(),
                content: newContent
            });

            Sayure.envBus.emit("diagnostic", {
                module: "SayureReadCompareRewriteClasses",
                action: "rewriteClass",
                file: fileName,
                status: "success"
            });

            return true;
        } catch (err) {
            Sayure.envBus.emit("diagnostic", {
                module: "SayureReadCompareRewriteClasses",
                action: "rewriteClass",
                file: fileName,
                status: "error",
                error: err.message
            });
            return false;
        }
    }

    /**
     * Workflow completo: ler, comparar e reescrever se necessário.
     */
    readCompareRewrite(fileName, newContent) {
        const oldContent = this.readClass(fileName);
        if (!oldContent) return false;

        const differences = this.compareClasses(oldContent, newContent);
        if (differences.length > 0) {
            return this.rewriteClass(fileName, newContent);
        }

        Sayure.envBus.emit("diagnostic", {
            module: "SayureReadCompareRewriteClasses",
            action: "readCompareRewrite",
            file: fileName,
            status: "no_changes"
        });

        return false;
    }
}

module.exports = SayureReadCompareRewriteClasses;
