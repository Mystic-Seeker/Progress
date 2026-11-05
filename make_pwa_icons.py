import zlib
import struct
import math

def make_solid_pwa_icon(filename, size):
    width, height = size, size
    raw_data = bytearray()
    
    # Solid background - #3D2A1C (NO transparency, 100% full-bleed for Android maskable spec)
    bg_color = (61, 42, 28)
    leaf_gold = (251, 191, 36)     # #FBBF24
    leaf_accent = (245, 158, 11)   # #F59E0B
    
    center_x = size / 2.0
    center_y = size / 2.0

    def inside_seedling(x, y):
        # Scale to fit comfortably inside the 65% safe zone of maskable icons
        nx = (x - center_x) / (size * 0.42)
        ny = (y - center_y) / (size * 0.42)

        # Stem
        stem_y = ny
        if -0.08 <= stem_y <= 0.46:
            expected_x = -0.04 * math.sin((stem_y - 0.46) * 3.5)
            stem_width = 0.06 - 0.02 * (0.46 - stem_y)
            if abs(nx - expected_x) <= stem_width:
                return True

        # Left Leaf
        lx = nx - (-0.20)
        ly = ny - (-0.08)
        angle_l = math.radians(-35)
        rlx = lx * math.cos(angle_l) - ly * math.sin(angle_l)
        rly = lx * math.sin(angle_l) + ly * math.cos(angle_l)
        if (rlx / 0.18)**2 + (rly / 0.10)**2 <= 1.0:
            return True

        # Right Leaf
        rx = nx - 0.20
        ry = ny - (-0.18)
        angle_r = math.radians(38)
        rrx = rx * math.cos(angle_r) - ry * math.sin(angle_r)
        rry = rx * math.sin(angle_r) + ry * math.cos(angle_r)
        if (rrx / 0.20)**2 + (rry / 0.11)**2 <= 1.0:
            return True

        # Soil base
        if (nx / 0.18)**2 + ((ny - 0.44) / 0.05)**2 <= 1.0:
            return True

        return False

    for y in range(height):
        raw_data.append(0) # Filter byte
        for x in range(width):
            if inside_seedling(x, y):
                if x > center_x:
                    raw_data.extend(leaf_gold + (255,))
                else:
                    raw_data.extend(leaf_accent + (255,))
            else:
                raw_data.extend(bg_color + (255,))

    def chunk(tag, data):
        return (struct.pack('>I', len(data)) +
                tag +
                data +
                struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff))

    png = b'\x89PNG\r\n\x1a\n'
    png += chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0))
    png += chunk(b'IDAT', zlib.compress(bytes(raw_data), 9))
    png += chunk(b'IEND', b'')

    with open(filename, 'wb') as f:
        f.write(png)

make_solid_pwa_icon('C:/Users/harsh/weekly-tracker/icon-192.png', 192)
make_solid_pwa_icon('C:/Users/harsh/weekly-tracker/icon-512.png', 512)
print("Solid PWA compliant icons generated!")
