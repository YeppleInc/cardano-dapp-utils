export function hexToBytes(hex) {
    if (hex.length % 2 !== 0 || !/^[0-9a-f]+$/i.test(hex)) {
        return null;
    }
    const buffer = new Uint8Array(hex.length / 2);
    for (let i = 0; i < buffer.length; i++) {
        buffer[i] = parseInt(hex.substr(2 * i, 2), 16);
    }
    return buffer;
}
