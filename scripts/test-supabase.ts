
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPBASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPBASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPBASE_SECRET_KEY;
const bucketName = process.env.NEXT_PUBLIC_STORAGE_BUCKET || 'container_storage';

console.log("--- Supabase/Storage Debug Test ---");
console.log(`URL Connected: ${!!supabaseUrl} (${supabaseUrl?.slice(0, 20)}...)`);
console.log(`Key Connected: ${!!supabaseKey}`);
console.log(`Target Bucket Name: '${bucketName}'`);

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runTest() {
    try {
        // 1. List Buckets
        console.log("\n1. Listing Storage Buckets...");
        const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();

        if (bucketError) {
            console.error("❌ Error listing buckets:", bucketError.message);
        } else {
            console.log("✅ Buckets found:", buckets.map(b => b.name));
            const myBucket = buckets.find(b => b.name === bucketName);
            if (myBucket) {
                console.log(`   -> ✅ Target bucket '${bucketName}' exists.`);
            } else {
                console.error(`   -> ❌ Target bucket '${bucketName}' NOT found in list.`);
            }
        }

        // 2. Test Upload (if bucket found)
        console.log(`\n2. Testing Upload to '${bucketName}'...`);
        const testFileName = `test-upload-${Date.now()}.txt`;
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from(bucketName)
            .upload(testFileName, "Hello World Test Content");

        if (uploadError) {
            console.error(`❌ Upload Failed:`, uploadError.message);
        } else {
            console.log(`✅ Upload Successful:`, uploadData.path);

            // Cleanup
            await supabase.storage.from(bucketName).remove([testFileName]);
            console.log("   (Cleaned up test file)");
        }

        // 3. Test DB Insert
        console.log("\n3. Testing Database Insert (Products)...");
        const testProduct = {
            name: "Debug Test Product",
            slug: `debug-${Date.now()}`,
            size: "20ft",
            type: "Standard",
            condition: "New",
            price: 100,
            images: ["https://placehold.co/100"],
            in_stock: false
        };

        const { data: insertData, error: insertError } = await supabase
            .from('products')
            .insert([testProduct])
            .select();

        if (insertError) {
            console.error(`❌ DB Insert Failed:`, insertError.message);
        } else {
            console.log(`✅ DB Insert Successful. ID:`, insertData[0].id);

            // Cleanup DB
            await supabase.from('products').delete().eq('id', insertData[0].id);
            console.log("   (Cleaned up test record)");
        }

    } catch (err: any) {
        console.error("❌ Unexpected Script Error:", err.message);
    }
}

runTest();
