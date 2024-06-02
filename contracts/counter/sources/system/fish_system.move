module counter::fish_system {
    use std::string;
    use sui::transfer;
    use sui::url::Url;
    use sui::url;
    use sui::object;
    use sui::display;
    use sui::package;
    use sui::tx_context::{TxContext, sender};
    use sui::object::UID;


    const DESCRIPTION: vector<u8> = b"Fish Resources";

    struct Fish has key,store {
        id:UID, /// Name for the token
        name: string::String,
        /// Description of the token
        description: string::String,
        /// URL for the token
        image_url: Url,
    }

    struct FISH_SYSTEM has drop {}

    fun init(otw: FISH_SYSTEM,ctx: &mut TxContext) {
        let keys = vector[
            string::utf8(b"name"),
            string::utf8(b"description"),
            string::utf8(b"project_url"),
            string::utf8(b"image_url"),
            string::utf8(b"creator"),
        ];

        let values = vector[
            // For `name` we can use the `Hero.name` property
            string::utf8(b"{name}"),
            // Description is static for all `Hero` objects.
            string::utf8(DESCRIPTION),
            // Project URL is usually static
            string::utf8(b"https://objects.club/"),
            string::utf8(b"https://raw.githubusercontent.com/Zombieliu/fish-game/main/assets/gif/{image_url}.gif"),
            // Creator field can be any
            string::utf8(b"Objects Dao Developer")
        ];
        // Claim the `Publisher` for the package!
        let publisher = package::claim(otw, ctx);

        // Get a new `Display` object for the `Hero` type.
        let display = display::new_with_fields<Fish>(
            &publisher, keys, values, ctx
        );

        // Commit first version of `Display` to apply changes.
        display::update_version(&mut display);

        transfer::public_transfer(publisher, sender(ctx));
        transfer::public_transfer(display, sender(ctx));
    }

    public entry fun catch_fish(fish_name:vector<u8>,fish_image:vector<u8>,ctx: &mut TxContext){
        transfer::public_transfer(Fish {
            id: object::new(ctx),
            name:string::utf8(fish_name),
            description:string::utf8(b"fish"),
            image_url:url::new_unsafe_from_bytes(fish_image)
        },sender(ctx))
    }
}
