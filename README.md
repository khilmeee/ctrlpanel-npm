Tentu, berikut adalah dokumen dalam format markdown yang telah disesuaikan:

```markdown
# CtrlPanel NPM Package

CtrlPanel adalah sebuah npm package yang menyediakan koneksi dengan API CtrlPanel untuk mengelola pengguna, server, dan notifikasi. Paket ini dikhususkan untuk penggunaan dengan platform Caligo.asia. Namun, kamu juga dapat memodifikasi kode untuk digunakan dengan sistem bawaan ctrlpanel.gg yang sesuai dengan kebutuhanmu.

## Instalasi

Untuk menginstal ctrlpanel, kamu dapat menggunakan npm:

```bash
npm install @miwone/ctrlpanel
```

## Penggunaan

```javascript
import Ctrlpanel from '@miwone/ctrlpanel';

const config = {
    url: 'https://example.com',
    api: {
        key: 'your-api-key',
        location: 'api'
    }
};

const client = new Ctrlpanel(config);

// Contoh penggunaan
client.getUser('user_id').then(user => {
    console.log(user);
}).catch(error => {
    console.error(error);
});
```

## Class: Ctrlpanel

### Constructor

```typescript
new Ctrlpanel(config: Config)
```

Membuat sebuah instance baru dari Ctrlpanel.

### Metode

#### getUser

```typescript
getUser(userId: string): Promise<User>
```

Mengambil informasi pengguna berdasarkan ID pengguna.

#### addCGO

```typescript
addCGO(userId: string, nominal: number): Promise<User>
```

Menambahkan saldo ke akun pengguna.

#### addServerSlot

```typescript
addServerSlot(userId: string, amount: number): Promise<User>
```

Menambahkan slot server ke akun pengguna.

#### sendNotif

```typescript
sendNotif(userId: string, via: 'database'|'email', title: string, content: string): Promise<any>
```

Mengirimkan notifikasi ke pengguna.

#### changeRole

```typescript
changeRole(userId: string, role: string, email: string, name: string): Promise<User>
```

Mengubah role pengguna di ctrlpanelmu.
```