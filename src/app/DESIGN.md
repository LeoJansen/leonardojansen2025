## 🎨 Identity & Design System

The project follows a **Cyber Tech / Neon Noir** aesthetic based on deep contrasts and vibrant neon accents.

### Color Palette

| Token Name | Hex | Usage |
| :--- | :--- | :--- |
| **Void Black** | `#050505` | Primary Background (Deepest Depth) |
| **Abyss** | `#0A0A0A` | Secondary Backgrounds / Sections |
| **Obsidian** | `#121212` | Cards, Surfaces, Modals |
| **Neon Base** | `#7C3AED` | Primary Actions, Brand Color (Violet) |
| **Neon Glow** | `#A78BFA` | Hovers, Glow Effects, Highlights |
| **Holo Text** | `#F3F4F6` | Primary Text (Ice White) |

### Design Tokens (Tailwind v4)
All colors are mapped to CSS variables in `globals.css` and can be used via utility classes:
- Backgrounds: `bg-void`, `bg-abyss`, `bg-obsidian`
- Accents: `bg-neon-base`, `text-neon-glow`
- Effects: `shadow-neon`, `shadow-glass`