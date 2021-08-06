CREATE TABLE IF NOT EXISTS migrations.infotable
(
    patient_id bigint NOT NULL ,
    phone_number character varying(50) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    gender character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email character varying(50) COLLATE pg_catalog."default",
    age integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    CONSTRAINT key_id PRIMARY KEY (patient_id)
)

TABLESPACE pg_default;

ALTER TABLE migrations.infotable
    OWNER to postgres;

GRANT ALL ON TABLE migrations.infotable TO postgres;