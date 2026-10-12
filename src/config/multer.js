import multer from 'multer'

const upload = multer({
    dest: 'uploads/perfis/',
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const permitidos = [
            'image/jpeg',
            'image/png',
            'image/webp'
        ]

        cb(null, permitidos.includes(file.mimetype))
    }
})

export default upload