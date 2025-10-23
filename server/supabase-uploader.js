export class SupabaseUploader {
    constructor() {
        this.supabaseUrl = 'https://iczsblxnxztvzdvfrgul.supabase.co';
        this.supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljenNibHhueHp0dnpkdmZyZ3VsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTQ5NjU5OCwiZXhwIjoyMDc1MDcyNTk4fQ.x8CUCDDqh7cdq8tm55Hc4KU71zl92oQVG0T5MFhFlaU';
        this.bucketName = 'masajii';
        
        this.supabase = supabase.createClient(this.supabaseUrl, this.supabaseKey);
    }

    generateFileName(file) {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const extension = file.name.split('.').pop();
        return `service_${timestamp}_${randomString}.${extension}`;
    }

    async uploadFile(file) {
        try {
            const fileName = this.generateFileName(file);
            
            const { data, error } = await this.supabase.storage
                .from(this.bucketName)
                .upload(fileName, file);

            if (error) {
                throw new Error(`Ошибка загрузки: ${error.message}`);
            }

            const { data: publicUrlData } = this.supabase.storage
                .from(this.bucketName)
                .getPublicUrl(fileName);

            return {
                success: true,
                url: publicUrlData.publicUrl,
                fileName: fileName
            };
            
        } catch (error) {
            console.error('Ошибка загрузки на Supabase:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}