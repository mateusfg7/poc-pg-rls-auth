DO $$
BEGIN
    -- owns tables, runs migrations
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'owner') THEN
        CREATE ROLE owner LOGIN PASSWORD 'owner';
    END IF;

    -- the API. no BYPASSRLS, not the owner
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app') THEN
        CREATE ROLE app LOGIN PASSWORD 'app';
    END IF;
END
$$;

-- owner creates/alters tables; app only needs to use the schema
GRANT CREATE, USAGE ON SCHEMA public TO owner;
GRANT USAGE ON SCHEMA public TO app;

-- any table owner creates from now on (i.e. every migration) automatically
-- grants app CRUD access, without app ever owning (and thus bypassing RLS on) it
ALTER DEFAULT PRIVILEGES FOR ROLE owner IN SCHEMA public
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app;

ALTER DEFAULT PRIVILEGES FOR ROLE owner IN SCHEMA public
    GRANT USAGE, SELECT ON SEQUENCES TO app;