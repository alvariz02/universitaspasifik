## Base URL
```
https://www.univpasifik.ac.id/api
```

## Endpoints

### Announcements (Pengumuman)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/announcements` | List all announcements |
| GET | `/announcements?limit=5&offset=0` | List with pagination |
| POST | `/announcements` | Create new announcement |
| GET | `/announcements/[id]` | Get single announcement |
| PUT | `/announcements/[id]` | Update announcement |
| DELETE | `/announcements/[id]` | Delete announcement |

**Query Parameters:**
- `limit`: Number of items (default: 10)
- `offset`: Pagination offset
- `priority`: Filter by priority (high/medium/low)
- `category`: Filter by category (akademik/administrasi/keuangan/umum)

### Admissions (Penerimaan Mahasiswa Baru)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admissions` | List all admissions |
| GET | `/admissions?active=true` | List only active admissions |
| POST | `/admissions` | Create new admission |
| PUT | `/admissions/[id]` | Update admission |
| DELETE | `/admissions/[id]` | Delete admission |

**Query Parameters:**
- `active`: Filter active admissions (true/false)
- `limit`: Number of items
- `slug`: Get admission by slug

### News (Berita)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/news` | List all news |
| GET | `/news?featured=true` | List featured news |
| GET | `/news?limit=6&offset=0` | List with pagination |
| POST | `/news` | Create news (admin) |
| GET | `/news/[id]` | Get single news |
| PUT | `/news/[id]` | Update news |
| DELETE | `/news/[id]` | Delete news |

### Events (Event/Kegiatan)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/events` | List all events |
| GET | `/events?upcoming=true` | List upcoming events |
| POST | `/events` | Create event (admin) |
| GET | `/events/[id]` | Get single event |
| PUT | `/events/[id]` | Update event |
| DELETE | `/events/[id]` | Delete event |

### Faculties (Fakultas)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/faculties` | List all faculties |
| GET | `/faculties?limit=100` | List all with high limit |
| POST | `/faculties` | Create faculty (admin) |
| PUT | `/faculties/[id]` | Update faculty |
| DELETE | `/faculties/[id]` | Delete faculty |

### Departments (Program Studi)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/departments` | List all departments |
| GET | `/departments?facultyId=1` | Filter by faculty |
| POST | `/departments` | Create department (admin) |
| PUT | `/departments/[id]` | Update department |
| DELETE | `/departments/[id]` | Delete department |

### Hero Sliders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/hero-sliders` | List all sliders |
| GET | `/hero-sliders?limit=10` | List with limit |
| POST | `/hero-sliders` | Create slider (admin) |
| PUT | `/hero-sliders/[id]` | Update slider |
| DELETE | `/hero-sliders/[id]` | Delete slider |

### Statistics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/statistics` | Get all statistics |

### Videos (Video Kegiatan)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/videos` | List all videos |
| GET | `/videos?limit=6&offset=0` | List with pagination |
| POST | `/videos` | Create video (admin) |
| PUT | `/videos/[id]` | Update video |
| DELETE | `/videos/[id]` | Delete video |

### Achievements (Prestasi)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/achievements` | List all achievements |
| GET | `/achievements?limit=6` | List with limit |
| POST | `/achievements` | Create achievement (admin) |
| PUT | `/achievements/[id]` | Update achievement |
| DELETE | `/achievements/[id]` | Delete achievement |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/contact` | Submit contact form |

### Upload
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/upload` | Upload image to Cloudinary |

**Request Body:**
```json
{
  "file": "base64_encoded_image",
  "folder": "universitas-pasifik"
}
```

**Response:**
```json
{
  "url": "https://res.cloudinary.com/.../image.jpg"
}
```

## Response Format

### Success Response
```json
{
  "id": 1,
  "title": "...",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Error Response
```json
{
  "error": "Error message here"
}
```

## Authentication

Admin endpoints require authentication via NextAuth session. Public endpoints (GET) are accessible without authentication.

## CORS

API supports CORS for cross-origin requests from the main domain.
