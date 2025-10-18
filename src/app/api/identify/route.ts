import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export const runtime = "edge"; // optional for performance

export async function POST(req: NextRequest) {
    try {
        const { imageUrl } = await req.json();

        if (!imageUrl) {
            return NextResponse.json(
                { error: "Missing required field: imageUrl" },
                { status: 400 }
            );
        }

        // Clear and strict instruction for structured JSON response
        const prompt = `
        You are a highly knowledgeable botanical identification assistant with advanced expertise in botany, ethnobotany, phytochemistry, and plant symbolism across world cultures.
        Analyze the provided image and respond **strictly** as a valid JSON object using this exact structure and guidelines:

        {
            "ScientificName": string,        // Include the full Latin binomial name with taxonomic classification (family, genus, species).
            "Edible": string,                // If edible: clearly state "Edible" and provide detailed nutritional information (macronutrients, vitamins, minerals, typical preparation methods, and any known dietary value). 
                                             // If toxic: clearly state "Toxic" and provide a comprehensive toxicological profile, including the primary toxic compounds (e.g., alkaloids, glycosides), parts of the plant that are poisonous, symptoms of ingestion, and traditional or medical cautionary notes.
            "CommonNames": string,           // List all recognized common or vernacular names for the plant, including those in different regions or languages.
            "Description": string,           // Describe the plant's morphology vividly: petal count, leaf shape, coloration, height, growth pattern, and natural habitat.
            "History": string,               // Provide a concise historical overview including geographic origin, first recorded scientific documentation, and notable cultural or economic significance.
            "InterestingUses": string,       // Detail practical, medicinal, or industrial uses with specific examples from traditional and modern contexts (e.g., herbal medicine, construction, cosmetics, food, etc.).
            "SpiritualUses": string,         // Identify specific cultures, tribes, or religious groups that use the plant in ritual or symbolic contexts. Explain its spiritual significance and cultural associations with concrete regional or tribal references.
            "Symbolism": string              // Explore the plant’s symbolic meanings across cultures, emotions, literature, and spirituality. 
                                             // Include cultural symbolism (e.g., national symbols, myths, folklore), emotional symbolism (e.g., love, resilience, mourning), 
                                             // literary symbolism (e.g., metaphors or recurring motifs in poetry, art, or stories), 
                                             // and spiritual or religious symbolism (e.g., associations with divinity, enlightenment, rebirth, or rituals).
            "Recipes": string                // Include one appetizing and contextually appropriate recipe that uses this plant, only if it is edible. For toxic plants, respond with "N/A". Recipes should be concise, name a real dish, and mention the plant’s role in flavor or nutrition.
            "GrowingGuide": string,          // Provide a concise yet practical guide on cultivating and caring for this plant. 
                                             // Include optimal soil type and pH, watering frequency, sunlight and temperature preferences, and propagation methods (e.g., seed, cutting, division). 
                                             // Mention pruning, fertilization, and common pests or diseases when relevant, and note if it can be grown indoors or outdoors in specific climate zones.        }

        Formatting and content rules:
        - Each string value must be **between 400 and 600 characters**, forming a cohesive paragraph with natural flow.
        - Be **factually grounded** and regionally accurate. If uncertain or unverifiable, respond with "N/A" for that key.
        - Avoid generic phrasing like “in some cultures.” Instead, name the specific culture, region, or belief system.
        - For toxic plants, emphasize **scientific toxicity details** and **omit recipes** entirely.
        - For edible plants, include **nutritional composition** (proteins, fats, carbohydrates, vitamins, minerals) and **culinary notes** (flavor, common preparations).
        - Respond strictly as a JSON object — no markdown, comments, explanations, or text outside the JSON.
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // or "gpt-4o" for higher accuracy
            response_format: { type: "json_object" }, // ✅ ensures clean JSON output
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: prompt },
                        {
                            type: "image_url",
                            image_url: { url: imageUrl },
                        },
                    ],
                },
            ],
        });

        // Since we used response_format=json_object, the API always returns valid JSON
        const jsonString = response.choices[0]?.message?.content || "{}";
        const parsed = JSON.parse(jsonString);

        return NextResponse.json(parsed);
    } catch (error: any) {
        console.error("OpenAI Image Analysis Error:", error);
        return NextResponse.json(
            {
                error: "Failed to analyze image",
                details: error?.error?.message || error.message || "Unknown error",
            },
            { status: 500 }
        );
    }
}
