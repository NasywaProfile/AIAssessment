<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\CmsSetting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Admin User
        User::updateOrCreate(
            ['email' => 'admin@nortis.ai'],
            [
                'name' => 'Admin Nortis',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        // 2. Seed Default CMS Settings
        CmsSetting::updateOrCreate(
            ['key' => 'categories'],
            ['value' => [
                ['id' => 'strategi', 'title' => 'Visi & Strategi AI', 'icon' => 'Target', 'description' => 'Kejelasan roadmap AI, investasi, dan penyelarasan dengan tujuan bisnis'],
                ['id' => 'proses', 'title' => 'Integrasi Proses & Operasional', 'icon' => 'Workflow', 'description' => 'Tingkat adopsi AI dalam alur kerja harian dan otomasi bisnis'],
                ['id' => 'sdm', 'title' => 'Kesiapan SDM & Budaya', 'icon' => 'Users', 'description' => 'Keterampilan AI tim, pelatihan, dan keterbukaan terhadap inovasi'],
                ['id' => 'data', 'title' => 'Infrastruktur Data & Teknologi', 'icon' => 'Database', 'description' => 'Ketersediaan data berkualitas, keamanan, dan arsitektur IT'],
                ['id' => 'tata-kelola', 'title' => 'Tata Kelola & Etika AI', 'icon' => 'Shield', 'description' => 'Kebijakan privasi, kepatuhan hukum, dan penggunaan AI secara bertanggung jawab'],
            ]]
        );

        CmsSetting::updateOrCreate(
            ['key' => 'questions'],
            ['value' => [
                [
                    'id' => 'q1',
                    'categoryId' => 'strategi',
                    'text' => 'Seberapa jelas strategi adopsi AI di organisasi Anda?',
                    'options' => [
                        ['text' => 'Belum ada strategi khusus terkait AI', 'score' => 1],
                        ['text' => 'Ada ketertarikan tetapi belum ada anggaran atau roadmap pasti', 'score' => 2],
                        ['text' => 'Strategi sedang disusun untuk beberapa proyek percontohan (pilot project)', 'score' => 3],
                        ['text' => 'Strategi terdefinisi jelas dengan alokasi anggaran khusus', 'score' => 4],
                        ['text' => 'AI menjadi pilar utama strategi pertumbuhan dan inovasi bisnis', 'score' => 5],
                    ]
                ],
                [
                    'id' => 'q2',
                    'categoryId' => 'proses',
                    'text' => 'Seberapa jauh tools AI telah diintegrasikan dalam alur kerja harian?',
                    'options' => [
                        ['text' => 'Belum ada pengunaan tools AI sama sekali', 'score' => 1],
                        ['text' => 'Digunakan secara individual tanpa panduan resmi perusahaan', 'score' => 2],
                        ['text' => 'Digunakan di beberapa tim/departemen spesifik', 'score' => 3],
                        ['text' => 'Terintegrasi dalam mayoritas proses operasional utama', 'score' => 4],
                        ['text' => 'Proses bisnis berjalan secara otomatis didorong oleh AI', 'score' => 5],
                    ]
                ],
                [
                    'id' => 'q3',
                    'categoryId' => 'sdm',
                    'text' => 'Bagaimana tingkat keterampilan dan pelatihan AI bagi karyawan Anda?',
                    'options' => [
                        ['text' => 'Tidak ada pelatihan AI sama sekali', 'score' => 1],
                        ['text' => 'Karyawan belajar sendiri secara mandiri', 'score' => 2],
                        ['text' => 'Program pelatihan AI dasar telah tersedia untuk beberapa peran', 'score' => 3],
                        ['text' => 'Program peningkatan keterampilan (upskilling) AI rutin untuk seluruh tim', 'score' => 4],
                        ['text' => 'Tim memiliki kepakaran AI tingkat tinggi dan terus melakukan riset/inovasi', 'score' => 5],
                    ]
                ],
                [
                    'id' => 'q4',
                    'categoryId' => 'data',
                    'text' => 'Seberapa siap kualitas dan arsitektur data organisasi Anda untuk AI?',
                    'options' => [
                        ['text' => 'Data masih terfragmentasi dalam dokumen fisik atau file terpisah', 'score' => 1],
                        ['text' => 'Data tersimpan digital namun belum terpusat atau kurang tersistem', 'score' => 2],
                        ['text' => 'Data terpusat tetapi memerlukan pembersihan sebelum diolah AI', 'score' => 3],
                        ['text' => 'Infrastruktur data modern dan siap diakses pipeline AI', 'score' => 4],
                        ['text' => 'Data real-time, otomatis terhubung, dan terlindungi dengan standar tinggi', 'score' => 5],
                    ]
                ],
                [
                    'id' => 'q5',
                    'categoryId' => 'tata-kelola',
                    'text' => 'Seberapa komprehensif kebijakan etika, keandalan, dan tata kelola AI Anda?',
                    'options' => [
                        ['text' => 'Belum ada panduan atau kebijakan etika AI', 'score' => 1],
                        ['text' => 'Memahami pentingnya etika tetapi belum memiliki dokumen kebijakan resmi', 'score' => 2],
                        ['text' => 'Panduan awal penggunaan AI yang aman telah diterbitkan', 'score' => 3],
                        ['text' => 'Kerangka kerja tata kelola data & AI yang ketat telah diimplementasikan', 'score' => 4],
                        ['text' => 'Sistem pemantauan risiko & kepatuhan AI berjalan secara kontinu dan terkontrol', 'score' => 5],
                    ]
                ],
            ]]
        );

        CmsSetting::updateOrCreate(
            ['key' => 'industries'],
            ['value' => [
                'Teknologi & Informasi',
                'Keuangan & Perbankan',
                'Kesehatan & Farmasi',
                'Manufaktur & Otomotif',
                'Ritel & E-commerce',
                'Pendidikan',
                'Pemerintahan & Publik',
                'Logistik & Transportasi',
                'Energi & Sumber Daya',
                'Media & Hiburan',
                'Lainnya'
            ]]
        );

        CmsSetting::updateOrCreate(
            ['key' => 'readinessLevels'],
            ['value' => [
                [
                    'level' => 'Pemula (Beginner)',
                    'minScore' => 0,
                    'maxScore' => 39,
                    'description' => 'Organisasi Anda berada di tahap awal eksplorasi AI. Diperlukan edukasi dasar, penguatan fondasi data, dan identifikasi use-case awal yang berdampak tinggi.'
                ],
                [
                    'level' => 'Emerging (Berkembang)',
                    'minScore' => 40,
                    'maxScore' => 59,
                    'description' => 'Organisasi telah mulai mencoba teknologi AI pada skala kecil. Fokus berikutnya adalah standarisasi alur kerja, pelatihan karyawan, dan penyusunan roadmap terintegrasi.'
                ],
                [
                    'level' => 'Maturing (Matang)',
                    'minScore' => 60,
                    'maxScore' => 79,
                    'description' => 'AI telah terintegrasi dalam beberapa proses bisnis utama. Langkah selanjutnya adalah memperluas skala adopsi, memperkuat tata kelola, dan meningkatkan infrastruktur data.'
                ],
                [
                    'level' => 'Advanced (Maju)',
                    'minScore' => 80,
                    'maxScore' => 100,
                    'description' => 'Organisasi Anda adalah pemersatu AI berpengalaman. AI menjadi pilar inovasi bisnis dengan infrastruktur canggih, tim yang mahir, dan ekosistem teroptimasi.'
                ]
            ]]
        );
    }
}
