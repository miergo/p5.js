
//written by Claude

/// <reference types="p5/global" />

// Store directory handle globally
let outputDirHandle: any = null;

function getSketchInfo(): { projectFolder: string, sketchName: string } {
    // Get all script tags with dist in the src
    const scripts = Array.from(document.querySelectorAll('script[src*="dist"]')) as HTMLScriptElement[];

    // Find the sketch script (NOT sketchHelper)
    const sketchScript = scripts.find(script =>
        script.src.includes('dist/') &&
        !script.src.includes('sketchHelper.js')
    );

    if (sketchScript) {
        const src = sketchScript.src;
        const match = src.match(/dist\/([^\/]+)\/([^\/]+)\.js$/);
        if (match) {
            return { projectFolder: match[1], sketchName: match[2] };
        }
    }

    return { projectFolder: 'default', sketchName: 'sketch' };
}

async function saveSketchCanvas(): Promise<void> {
    try {
        const info = getSketchInfo();

        // Get counter
        const counterKey = `${info.projectFolder}_${info.sketchName}_counter`;
        let counter = parseInt(localStorage.getItem(counterKey) || '0', 10);
        counter++;
        localStorage.setItem(counterKey, counter.toString());

        const counterStr = counter.toString().padStart(3, '0');
        const filename = `${info.sketchName}-${counterStr}.png`;

        // Check if browser supports File System Access API
        // @ts-ignore
        if ('showDirectoryPicker' in window) {
            // Request directory access (only needed once per session)
            if (!outputDirHandle) {
                // @ts-ignore
                outputDirHandle = await window.showDirectoryPicker();
            }

            // Get or create project folder
            const projectDir = await outputDirHandle.getDirectoryHandle(info.projectFolder, { create: true });

            // Get canvas blob
            const canvas = document.querySelector('canvas') as HTMLCanvasElement;
            const blob = await new Promise<Blob>((resolve) => canvas.toBlob(resolve as any, 'image/png'));

            // Create and write file
            const fileHandle = await projectDir.getFileHandle(filename, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(blob!);
            await writable.close();

            console.log(`✓ Saved: output/${info.projectFolder}/${filename}`);
        } else {
            // Fallback to regular download for unsupported browsers
            console.warn('File System Access API not supported. Falling back to download.');
            saveCanvas(`${info.projectFolder}_${filename}`, 'png');
        }

    } catch (error: any) {
        if (error.name === 'AbortError') {
            console.log('Save cancelled by user');
        } else {
            console.error('Error saving:', error);
            // Fallback to regular download
            const info = getSketchInfo();
            const counterKey = `${info.projectFolder}_${info.sketchName}_counter`;
            let counter = parseInt(localStorage.getItem(counterKey) || '0', 10);
            const counterStr = counter.toString().padStart(3, '0');
            saveCanvas(`${info.projectFolder}_${info.sketchName}-${counterStr}`, 'png');
        }
    }
}