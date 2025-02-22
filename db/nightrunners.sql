--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6 (Ubuntu 16.6-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.6 (Ubuntu 16.6-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: aspirations; Type: TABLE; Schema: public; Owner: gian
--

CREATE TABLE public.aspirations (
    id integer NOT NULL,
    type character varying(32)
);


ALTER TABLE public.aspirations OWNER TO gian;

--
-- Name: aspirations_id_seq; Type: SEQUENCE; Schema: public; Owner: gian
--

ALTER TABLE public.aspirations ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.aspirations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: brands; Type: TABLE; Schema: public; Owner: gian
--

CREATE TABLE public.brands (
    id integer NOT NULL,
    name character varying(255),
    year_est character varying(4),
    founder character varying(64)
);


ALTER TABLE public.brands OWNER TO gian;

--
-- Name: brands_id_seq; Type: SEQUENCE; Schema: public; Owner: gian
--

ALTER TABLE public.brands ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.brands_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: cars; Type: TABLE; Schema: public; Owner: gian
--

CREATE TABLE public.cars (
    id integer NOT NULL,
    modelname character varying(128) NOT NULL,
    brandid integer NOT NULL,
    engineid integer,
    enginesize character varying(12),
    horsepower integer,
    torque integer,
    weightkg integer,
    year character varying(4),
    colorid integer,
    mileage integer,
    drivetrainid integer,
    transmissionid integer,
    aspirationid integer
);


ALTER TABLE public.cars OWNER TO gian;

--
-- Name: cars_id_seq; Type: SEQUENCE; Schema: public; Owner: gian
--

ALTER TABLE public.cars ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cars_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: colors; Type: TABLE; Schema: public; Owner: gian
--

CREATE TABLE public.colors (
    id integer NOT NULL,
    name character varying(64)
);


ALTER TABLE public.colors OWNER TO gian;

--
-- Name: colors_id_seq; Type: SEQUENCE; Schema: public; Owner: gian
--

ALTER TABLE public.colors ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.colors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: drivetrains; Type: TABLE; Schema: public; Owner: gian
--

CREATE TABLE public.drivetrains (
    id integer NOT NULL,
    type character varying(32)
);


ALTER TABLE public.drivetrains OWNER TO gian;

--
-- Name: drivetrains_id_seq; Type: SEQUENCE; Schema: public; Owner: gian
--

ALTER TABLE public.drivetrains ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.drivetrains_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: engines; Type: TABLE; Schema: public; Owner: gian
--

CREATE TABLE public.engines (
    id integer NOT NULL,
    type character varying(32)
);


ALTER TABLE public.engines OWNER TO gian;

--
-- Name: engines_id_seq; Type: SEQUENCE; Schema: public; Owner: gian
--

ALTER TABLE public.engines ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.engines_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: transmissions; Type: TABLE; Schema: public; Owner: gian
--

CREATE TABLE public.transmissions (
    id integer NOT NULL,
    type character varying(32)
);


ALTER TABLE public.transmissions OWNER TO gian;

--
-- Name: transmissions_id_seq; Type: SEQUENCE; Schema: public; Owner: gian
--

ALTER TABLE public.transmissions ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.transmissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: aspirations; Type: TABLE DATA; Schema: public; Owner: gian
--

COPY public.aspirations (id, type) FROM stdin;
\.


--
-- Data for Name: brands; Type: TABLE DATA; Schema: public; Owner: gian
--

COPY public.brands (id, name, year_est, founder) FROM stdin;
\.


--
-- Data for Name: cars; Type: TABLE DATA; Schema: public; Owner: gian
--

COPY public.cars (id, modelname, brandid, engineid, enginesize, horsepower, torque, weightkg, year, colorid, mileage, drivetrainid, transmissionid, aspirationid) FROM stdin;
\.


--
-- Data for Name: colors; Type: TABLE DATA; Schema: public; Owner: gian
--

COPY public.colors (id, name) FROM stdin;
\.


--
-- Data for Name: drivetrains; Type: TABLE DATA; Schema: public; Owner: gian
--

COPY public.drivetrains (id, type) FROM stdin;
\.


--
-- Data for Name: engines; Type: TABLE DATA; Schema: public; Owner: gian
--

COPY public.engines (id, type) FROM stdin;
\.


--
-- Data for Name: transmissions; Type: TABLE DATA; Schema: public; Owner: gian
--

COPY public.transmissions (id, type) FROM stdin;
\.


--
-- Name: aspirations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gian
--

SELECT pg_catalog.setval('public.aspirations_id_seq', 1, false);


--
-- Name: brands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gian
--

SELECT pg_catalog.setval('public.brands_id_seq', 1, false);


--
-- Name: cars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gian
--

SELECT pg_catalog.setval('public.cars_id_seq', 1, false);


--
-- Name: colors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gian
--

SELECT pg_catalog.setval('public.colors_id_seq', 1, false);


--
-- Name: drivetrains_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gian
--

SELECT pg_catalog.setval('public.drivetrains_id_seq', 1, false);


--
-- Name: engines_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gian
--

SELECT pg_catalog.setval('public.engines_id_seq', 1, false);


--
-- Name: transmissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gian
--

SELECT pg_catalog.setval('public.transmissions_id_seq', 1, false);


--
-- Name: aspirations aspirations_pkey; Type: CONSTRAINT; Schema: public; Owner: gian
--

ALTER TABLE ONLY public.aspirations
    ADD CONSTRAINT aspirations_pkey PRIMARY KEY (id);


--
-- Name: brands brands_pkey; Type: CONSTRAINT; Schema: public; Owner: gian
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);


--
-- Name: cars cars_pkey; Type: CONSTRAINT; Schema: public; Owner: gian
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_pkey PRIMARY KEY (id);


--
-- Name: colors colors_pkey; Type: CONSTRAINT; Schema: public; Owner: gian
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_pkey PRIMARY KEY (id);


--
-- Name: drivetrains drivetrains_pkey; Type: CONSTRAINT; Schema: public; Owner: gian
--

ALTER TABLE ONLY public.drivetrains
    ADD CONSTRAINT drivetrains_pkey PRIMARY KEY (id);


--
-- Name: engines engines_pkey; Type: CONSTRAINT; Schema: public; Owner: gian
--

ALTER TABLE ONLY public.engines
    ADD CONSTRAINT engines_pkey PRIMARY KEY (id);


--
-- Name: transmissions transmissions_pkey; Type: CONSTRAINT; Schema: public; Owner: gian
--

ALTER TABLE ONLY public.transmissions
    ADD CONSTRAINT transmissions_pkey PRIMARY KEY (id);


--
-- Name: cars cars_aspirationid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gian
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_aspirationid_fkey FOREIGN KEY (aspirationid) REFERENCES public.aspirations(id);


--
-- Name: cars cars_brandid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gian
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_brandid_fkey FOREIGN KEY (brandid) REFERENCES public.brands(id);


--
-- Name: cars cars_colorid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gian
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_colorid_fkey FOREIGN KEY (colorid) REFERENCES public.colors(id);


--
-- Name: cars cars_drivetrainid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gian
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_drivetrainid_fkey FOREIGN KEY (drivetrainid) REFERENCES public.drivetrains(id);


--
-- Name: cars cars_engineid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gian
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_engineid_fkey FOREIGN KEY (engineid) REFERENCES public.engines(id);


--
-- Name: cars cars_transmissionid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gian
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_transmissionid_fkey FOREIGN KEY (transmissionid) REFERENCES public.transmissions(id);


--
-- PostgreSQL database dump complete
--

